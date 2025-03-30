import { getImageStyle } from "@/utils/getTypes";
import axios from "axios";

export const createVideo = async (userId: string, videoId: string, prompt: string, imageStyle: string, voiceName: string, voiceSpeed: number, estimatedCharges: number) => {
  try {
    const response = await axios.post(`${process.env.PYTHON_BACKEND_API}/`, { userId, videoId, prompt, imageStyle: getImageStyle(imageStyle), voiceName, voiceSpeed, estimatedCharges });
    console.log(response.status);
  } catch (error) {
    console.error("Upload error:", error);
  }
};
