"use client"; // Ensure this runs only on the client side

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { FaPlay, FaPause } from "react-icons/fa"; // Import icons

const CLOUDFARE_R2_PUBLIC_BASE_URL = process.env.NEXT_PUBLIC_CLOUDFARE_R2_PUBLIC_BASE_URL!; // Replace with actual URL

interface AudioPlayerProps {
  voiceKey: string;
  globalAudio: HTMLAudioElement | null;
  currentPlayingVoice: string | null;
  setCurrentPlayingVoice: (voice: string | null) => void;
}

export default function AudioPlayer({ voiceKey, globalAudio, currentPlayingVoice, setCurrentPlayingVoice }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = (e: React.MouseEvent) => {
    e.preventDefault();
    const audioUrl = `${CLOUDFARE_R2_PUBLIC_BASE_URL}/${voiceKey}.wav`;
    console.log(CLOUDFARE_R2_PUBLIC_BASE_URL);
    if (!globalAudio) return; // Prevent errors if still running on the server

    if (currentPlayingVoice === voiceKey) {
      if (isPlaying) {
        globalAudio.pause();
        setIsPlaying(false);
        return;
      }
    }

    globalAudio.src = audioUrl;
    globalAudio.load();
    globalAudio.play();
    setIsPlaying(true);
    setCurrentPlayingVoice(voiceKey);

    globalAudio.onended = () => {
      setIsPlaying(false);
    };
  };

  useEffect(() => {
    return () => {
      if (globalAudio) {
        globalAudio.pause();
        setIsPlaying(false);
      }
    };
  }, []);
  return (
    <Button size="icon" variant="ghost" className="ml-2" onClick={togglePlay}>
      {isPlaying && voiceKey === currentPlayingVoice ? <FaPause className="w-4 h-4" /> : <FaPlay className="w-4 h-4" />}
    </Button>
  );
}
