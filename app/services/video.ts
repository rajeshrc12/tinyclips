import { getImageStyle } from "@/utils/getTypes";
import axios from "axios";

export const createVideo = async (userId: string, videoId: string, prompt: string, imageStyle: string, voiceName: string, voiceSpeed: number) => {
  try {
    const response = await axios.post(`${process.env.PYTHON_BACKEND_API}/`, { userId, videoId, prompt, imageStyle: getImageStyle(imageStyle), voiceName, voiceSpeed });
    console.log(response.status);
  } catch (error) {
    console.error("Upload error:", error);
  }
};
