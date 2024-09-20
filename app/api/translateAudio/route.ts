import { NextRequest, NextResponse } from "next/server";
import { DefaultAzureCredential, getBearerTokenProvider } from "@azure/identity";
import { AzureOpenAI } from "openai";

const credential = new DefaultAzureCredential();
const apiVersion = "2024-08-01-preview";
const deployment = process.env.AZURE_DEPLOYEMENT_NAME;
const endpoint = process.env.AZURE_ENDPOINT;
const apiKey=process.env.AZURE_API_KEY
export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const file = formData.get("audio") as File;

  if (!file || file.size === 0) {
    return NextResponse.json({ message: "No audio file provided" }, { status: 400 });
  }

  const arrayBuffer = await file.arrayBuffer();
  const audio = new Uint8Array(arrayBuffer);
  console.log("== Transcribe Audio Sample ==");

  const client = new AzureOpenAI({
    endpoint,
    apiKey,
    apiVersion,
    deployment,
  });

  console.log("paaaaaaasssssssss")
  const filee = new File([audio], 'audio.wav', {
    type: 'audio/wav',
    lastModified: Date.now(),
  });
  try {
    const result = await client.audio.transcriptions.create({
        model: "",
        file:filee, // Pass the Blob directly
    });

    console.log(`Transcription: ${result.text}`);
    return NextResponse.json({ text: result.text });
  } catch (error) {
    console.error("Error transcribing audio:", error);
    return NextResponse.json({ message: "Error transcribing audio", error: (error as Error).message }, { status: 500 });
  }
}
