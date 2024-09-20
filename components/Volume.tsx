'use client'
import { Volume2 } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";

function VolumeIcon ({ value }: { value: string }) {
    const speakHistory=async(targetValue: string) =>{
        console.log("speaaaaaaaak");
        const synth = window.speechSynthesis;
        if (!synth) return;
      
        const utterance = new SpeechSynthesisUtterance(targetValue);
        synth.speak(utterance);
      }
  const handleClick = () => {
    try {
      speakHistory(value); // Call the function with the provided value.
      console.log("speakHistory called with:", value); // Log the value to ensure it's correct.
    } catch (error) {
      console.error("Error in speakHistory:", error); // Handle any errors gracefully.
    }
  };
  return (
    <Button className="hover:bg-transparent" variant="ghost" type="button" onClick={handleClick}>
      <Volume2 size={24} className="text-gray-500" />
    </Button>
  );
};

export default VolumeIcon;
