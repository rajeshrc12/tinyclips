import axios from "axios";

export const createVideo = async (userId: string, videoId: string, prompt: string, imageStyle: string, voiceName: string, voiceSpeed: number) => {
  try {
    console.log({ videoId, prompt, imageStyle, voiceName, voiceSpeed });
    const response = await axios.post(`${process.env.PYTHON_BACKEND_API}/`, { userId, videoId, prompt, imageStyle, voiceName, voiceSpeed });
    console.log(response.status);
  } catch (error) {
    console.error("Upload error:", error);
  }
};
