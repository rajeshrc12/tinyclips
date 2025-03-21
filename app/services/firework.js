export const transcribeAudio = async (audioBlob) => {
  const formData = new FormData();
  formData.append("file", audioBlob);
  formData.append("model", "whisper-v3");
  formData.append("temperature", "0");
  formData.append("timestamp_granularities", "word");
  formData.append("audio_window_seconds", "5");
  formData.append("speculation_window_words", "4");
  formData.append("response_format", "verbose_json");

  const transcriptionResponse = await fetch("https://audio-prod.us-virginia-1.direct.fireworks.ai/v1/audio/transcriptions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.FIREWORK_API_KEY}`,
    },
    body: formData,
  });

  const transcription = await transcriptionResponse.json();
  return transcription.words;
};
