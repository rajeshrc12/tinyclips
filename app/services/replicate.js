import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});
export const generateAudio = async ({ prompt, voiceSpeed, voiceName }) => {
  const output = await replicate.run("jaaari/kokoro-82m:f559560eb822dc509045f3921a1921234918b91739db4bf3daab2169b71c7a13", {
    input: {
      text: prompt,
      speed: voiceSpeed,
      voice: voiceName,
    },
  });
  const audioBlob = await output.blob();
  return audioBlob;
};
