import { useState, useRef } from "react";

export const useRecorder = () => {
  const [recording, setRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunks = useRef<Blob[]>([]);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorderRef.current = mediaRecorder;
    chunks.current = [];

    mediaRecorder.ondataavailable = (e) => {
      chunks.current.push(e.data);
    };

    mediaRecorder.start();
    setRecording(true);
  };

  const stopRecording = (): Promise<File> => {
    return new Promise((resolve) => {
      if (!mediaRecorderRef.current) return;

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunks.current, { type: "audio/wav" });
        const file = new File([blob], "recording.wav");
        setRecording(false);
        resolve(file);
      };

      mediaRecorderRef.current.stop();
    });
  };

  return { recording, startRecording, stopRecording };
};