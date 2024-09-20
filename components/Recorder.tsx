"use client";
import React, { useState, useRef } from "react";
import { Mic } from "lucide-react";
import { Button } from "./ui/button";

const AudioRecorder = ({ uploadAudio }: { uploadAudio: (blob: Blob) => void }) => {
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioStreamRef = useRef<MediaStream | null>(null); // Ref to store the media stream

  const handleStartRecording = async () => {
    try {
      // Request permission to use the microphone and specify MIME type
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioStreamRef.current = stream; // Store the stream so we can stop it later
      mediaRecorderRef.current = new MediaRecorder(stream, {
        mimeType: "audio/webm", // Specify the desired format
      });

      audioChunksRef.current = [];

      // Collect audio data chunks
      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      // Start recording
      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Error accessing microphone:", error);
      alert("Failed to access the microphone.");
    }
  };

  const handleStopRecording = () => {
    // Stop recording
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);

      // Handle the recorded audio when the recording stops
      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        console.log("Audio recorded successfully!", audioBlob);
        uploadAudio(audioBlob);

        // Release the microphone stream to stop it completely
        if (audioStreamRef.current) {
          audioStreamRef.current.getTracks().forEach((track) => track.stop());
          audioStreamRef.current = null; // Clear the stream reference
        }
      };
    }
  };

  return (
    <div className="p-4">
      {/* Start/Stop button using Mic icon */}
      <Button
        variant={"ghost"}
        type="button"
        onClick={isRecording ? handleStopRecording : handleStartRecording}
        className={`flex items-center space-x-2 px-3 py-1 rounded-md bg-white transition-colors ${
          isRecording ? "bg-red-500 text-white hover:bg-red-600" : "bg-blue-600 text-white hover:text-white hover:bg-blue-700"
        }`}
      >
        <Mic size={18} />
        <span className="text-sm">{isRecording ? "Stop" : "Speak"}</span>
      </Button>
    </div>
  );
};

export default AudioRecorder;
