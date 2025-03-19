from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from fastapi import FastAPI
import os
import google.generativeai as genai
from dotenv import load_dotenv
import json
from io import BytesIO
from PIL import Image, ImageDraw, ImageFont
from moviepy.editor import AudioFileClip, VideoClip
import numpy as np
import time
import whisper
import replicate
import requests
import tempfile
import boto3
from pathlib import Path
FONT_PATH = Path(__file__).parent / "eng.ttf"

# Load environment variables from .env file
load_dotenv()

# Create FastAPI instance with custom docs and openapi url
app = FastAPI(docs_url="/api/py/docs", openapi_url="/api/py/openapi.json")

# Allow CORS from frontend URL (and development URLs)
origins = [
    "https://tinyclips.vercel.app",
    "http://localhost:3000"
]

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# GEMINI Config
GEMINI_API_TOKEN = os.getenv("GEMINI_API_KEY")
REPLICATE_API_TOKEN = os.getenv("REPLICATE_API_TOKEN")
WASABI_ACCESS_KEY = os.getenv("WASABI_ACCESS_KEY")
WASABI_SECRET_KEY = os.getenv("WASABI_SECRET_KEY")
WASABI_ENDPOINT = os.getenv("WASABI_ENDPOINT")
WASABI_BUCKET_NAME = os.getenv("WASABI_BUCKET_NAME")

genai.configure(api_key=GEMINI_API_TOKEN)


gemini_model = genai.GenerativeModel("gemini-2.0-flash")

s3_client = boto3.client(
    "s3",
    aws_access_key_id=WASABI_ACCESS_KEY,
    aws_secret_access_key=WASABI_SECRET_KEY,
    endpoint_url=f"https://{WASABI_ENDPOINT}"
)

def create_image_prompts(script,image_prompts_count):
    print("Generating prompts from script...",script)
    script_template = f"""
You are an expert portrait image prompt generator.
Read the script thoroughly to understand its overall context and theme.
Generate a detailed portrait image prompt that visually represents the content, emotion, facial expressions and atmosphere for a compelling portrait representation.
Ensure that each prompt maintains relevance and aligns with the sequence of the script to preserve its flow.
If the script references a product, service, or advertisement, create a relevant object in the scene with appropriate text, symbols ensuring it blends naturally with the surroundings.
The total number of prompts should be equal to {image_prompts_count} and ensure the entire script is represented.

Return the output as an array of prompts in the following format:
[
"First prompt description",
"Second prompt description",
...
"Last prompt description"
]
Ensure there are no extra keys, indices, or labels — only the prompts enclosed in double quotes within the array.
Script : "{script}"
    """
    try:
        # Generate the response from the model
        response = gemini_model.generate_content(script_template).text
        # Remove the surrounding brackets and parse the list
        start = response.find('[')
        end = response.rfind(']') + 1

        print("All prompts generated !!!")

        # Extract the string between the brackets and strip any leading or trailing whitespace
        image_prompts = json.loads(response[start:end].strip())

        return image_prompts
    except Exception as e:
        print(str(e))
        return []

def generate_audio(script, speed=0.9, voice="am_adam"):
    print("Generating speech...")
    output = replicate.run(
        "jaaari/kokoro-82m:f559560eb822dc509045f3921a1921234918b91739db4bf3daab2169b71c7a13",
        input={
            "text": script,
            "speed": speed,
            "voice": voice
        }
    )
    # output = "https://replicate.delivery/czjl/ZpQ6y6VCoBZcDxuWJbp9rwXgTbUhgVUzwRn2iDiTXSxpZhCF/output.wav"
    response = requests.get(output)
    if response.status_code == 200:
        print("Audio downloaded successfully!")
        return response.content  # Return audio content if successful
    else:
        print(f"Failed to download audio. Status code: {response.status_code}")
        return None
    
def generate_image(prompt,index=0,count=0):
    if count:
        print(f"->processing {index+1} image of {count}...")
    output = replicate.run(
        "black-forest-labs/flux-schnell",
        input={
            "prompt": prompt,
            "go_fast": True,
            "megapixels": "1",
            "num_outputs": 1,
            "aspect_ratio": "9:16",
            "output_format": "png",
            "output_quality": 80,
            "num_inference_steps": 4
        }
    )
    print(output)
    if isinstance(output, list) and output:
        file_output = output[0]  # Get the first FileOutput object

        if isinstance(file_output, replicate.helpers.FileOutput):
            # Read file content into memory
            image_data = file_output.read()
            # Convert to Pillow Image object
            image = Image.open(BytesIO(image_data))
            if count:
                print(f"->completed !!!")
            return image
        else:
            print("Unexpected output format.")
            return None
    else:
        print("Invalid response from Replicate API.")
        return None

# Function to generate frames
def make_frame(t,image_objects,subtitles,subtitle_with_image_index):
    image_index = get_prompt_by_time(subtitle_with_image_index,t)
    base_image = image_objects[image_index].copy()
    # base_image = Image.new("RGB", (1080, 1920), "yellow")
    draw = ImageDraw.Draw(base_image)

    current_word = next((subtitle['word'] for subtitle in subtitles if subtitle['start'] <= t < subtitle['end']), "")

    font = ImageFont.truetype(FONT_PATH, 70)
    text_width, text_height = draw.textbbox((0, 0), current_word, font=font)[2:]
    text_x = (base_image.width - text_width) // 2
    text_y = (base_image.height - text_height) // 2

    draw.text((text_x, text_y), current_word, font=font, fill="white",stroke_width=5, stroke_fill="black")
    return np.array(base_image)

def split_time_series(input_list, interval_length=2.0):
    """Process the input list and generate the desired output in one function."""
    output = []
    for interval in input_list:
        start = interval['start']
        end = interval['end']
        series = []
        current_start = start
        while current_start < end:
            current_end = min(current_start + interval_length, end)
            # If the remaining duration is less than the interval length, merge it with the previous interval
            if series and (current_end - current_start) < interval_length:
                series[-1]['end'] = current_end  # Merge with the previous interval
            else:
                series.append({'start': current_start, 'end': current_end})
            current_start = current_end
        output.append({
            'start': start,
            'end': end,
            'series': series,
            'word' : interval['word']
        })
    return output

def get_prompt_by_time(result, time):
    for entry in result:
        if entry['start'] <= time < entry['end']:
            return entry['index']
    return len(result)-1

def get_subtitle_with_image_index(data):
    count = 0
    subtitle_with_image_index=[]
    for item in data:
        item["index"] = []
        for i,series in enumerate(item["series"]):
            series["index"]=count
            subtitle_with_image_index.append(series.copy())
            item["index"].append(count)
            count+=1
    return subtitle_with_image_index

def get_audio_in_bytes(url):
    try:
        response = requests.get(url)
        response.raise_for_status()  # Ensure the request was successful
        audio = BytesIO(response.content)
        return audio
    except Exception as e:
        print(f"Error fetching file from URL: {e}")
        return False

def transcribe_audio(audio):
    """
    Generate word-level and segment-level subtitles from an audio file using Whisper.
    :param audio: Audio file or BytesIO object.
    :return: Word-level and segment-level subtitles.
    """
    print("Transcribing audio...")
    # Load the Whisper model
    model = whisper.load_model("base")

    # Transcribe the audio file with word-level timestamps
    result_word = model.transcribe(audio, word_timestamps=True, fp16=False)
    result_segment = model.transcribe(audio, word_timestamps=False, fp16=False)
    # Extract words and their timestamps
    subtitles = []
    subtitles_segment = []
    for segment in result_word['segments']:
        for word_data in segment['words']:
            word = word_data['word']
            start = word_data['start']
            end = word_data['end']
            subtitles.append({"word": word, "start": start, "end": end})

    for segment in result_segment['segments']:
        word = segment['text']
        start = segment['start']
        end = segment['end']
        subtitles_segment.append({"word": word, "start": start, "end": end})

    print("Transcribing audio completed!!!")
    return subtitles, subtitles_segment

def create_new_image_prompt(prompt,image_style):
    new_prompt = prompt
    if image_style:
        new_prompt = f"Create {image_style} style image of " + prompt
    return new_prompt

def upload_video(video,object_name):
    try:
        # Create a BytesIO buffer to store the video
        video_buffer = BytesIO()
        
        # Use a temporary file path to store the video data as an MP4 file
        with tempfile.NamedTemporaryFile(delete=False, suffix='.mp4') as temp_video_file:
            video_temp_path = temp_video_file.name  # Save the temporary file path

        # Write the video to the temporary file path with MP4 format (30 FPS)
        video.write_videofile(video_temp_path, codec='libx264', audio_codec='aac', fps=30)

        # Open the temporary video file to load into a buffer
        with open(video_temp_path, 'rb') as video_file:
            video_buffer.write(video_file.read())
        
        # Seek to the beginning of the buffer after writing
        video_buffer.seek(0)

        # Create a boto3 client to interact with Wasabi (using AWS S3 SDK)
        s3_client = boto3.client(
            's3',
            endpoint_url='https://'+WASABI_ENDPOINT,
            aws_access_key_id=WASABI_ACCESS_KEY,
            aws_secret_access_key=WASABI_SECRET_KEY
        )

        # Upload the video to the Wasabi bucket
        s3_client.upload_fileobj(video_buffer, WASABI_BUCKET_NAME, f"video/{object_name}.mp4")
        print(f"Video successfully uploaded to Wasabi bucket: {WASABI_BUCKET_NAME}/video/{object_name}")
        
        # Generate a signed URL valid for 1 hour (3600 seconds)
        signed_url = s3_client.generate_presigned_url(
            'get_object',
            Params={'Bucket': WASABI_BUCKET_NAME, 'Key': f"video/{object_name}.mp4"},
            ExpiresIn=3600  # URL expiration time in seconds
        )
        
        print(f"Signed URL: {signed_url}")
        return signed_url

    except Exception as e:
        print(f"Error uploading file to Wasabi: {e}")
        return False


class VideoRequest(BaseModel):
    script: str


@app.get("/api/py")
def hello_fast_api():
    return {"message": "Hello from FastAPI"}

@app.post("/api/py/video")
def process_video(video_request: VideoRequest):
    script = video_request.script
    image_style = ""
    audio_content = generate_audio(script,0.9,"am_adam")
    with tempfile.NamedTemporaryFile(delete=False, suffix='.wav') as temp_audio_file:
        temp_audio_file.write(audio_content)  # Write the content to the file
        temp_audio_file_path = temp_audio_file.name  # Get the path to the temporary file

    subtitles, subtitles_segment = transcribe_audio(temp_audio_file_path)
    subtitles_time_series = split_time_series(subtitles_segment)
    subtitle_with_image_index = get_subtitle_with_image_index(subtitles_time_series)
    image_prompts=[]
    for item in subtitles_time_series:
        image_prompts+= create_image_prompts(item["word"],len(item["series"]))

    images = []
    for index, prompt in enumerate(image_prompts):
        new_prompt = create_new_image_prompt(prompt,image_style)
        images.append(generate_image(new_prompt,index,len(image_prompts)))

    audio_clip = AudioFileClip(temp_audio_file_path)
    video_clip = VideoClip(lambda t: make_frame(t, images,subtitles,subtitle_with_image_index), duration=audio_clip.duration)

    video_clip = video_clip.set_audio(audio_clip)
    url = upload_video(video_clip,f"output_video_{str(round(time.time()))}")

    audio_clip.close()
    os.remove(temp_audio_file_path)

    return {"url":url}

