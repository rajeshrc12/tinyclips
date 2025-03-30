// utils/getImageStyle.ts
import { IMAGE_STYLES } from "@/constants/imageStyles";
import { VOICE_NAMES } from "@/constants/voiceNames";
import { ImageStyle, VoiceName } from "@/types/user-input";

export const getImageStyle = (key: string): string => {
  console.log(IMAGE_STYLES[key as ImageStyle]);
  return IMAGE_STYLES[key as ImageStyle] ?? "Hyper-realistic";
};
export const getVoiceName = (key: string): string => {
  return VOICE_NAMES[key as VoiceName] ?? "Adam";
};
