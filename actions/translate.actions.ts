"use server";

import { TranslationData } from "@/lib/Types";
import removeTranslation, { addTranslation } from "@/mongodb/functions";
import { auth } from "@clerk/nextjs/server";
import axios from "axios";
import { revalidateTag } from "next/cache";
import { v4 as uuidv4 } from "uuid";
import { any } from "zod";
const subscriptionKey = process.env.AZURE_TEXT_TRANSLATION_KEY;
const endpoint = process.env.AZURE_TEXT_TRANSLATION;
const location = process.env.AZURE_TEXT_LOCATION;
export async function translate(dataa: TranslationData) {
  auth().protect();
  const { userId } = auth();
  if (!userId) throw new Error("User not found");
  try {
    // Make the request to the Azure Translator API
    const response = await axios({
      baseURL: endpoint,
      url: "/translate",
      method: "post",
      headers: {
        "Ocp-Apim-Subscription-Key": subscriptionKey,
        "Ocp-Apim-Subscription-Region": location, // Required for regional services
        "Content-type": "application/json",
        "X-ClientTraceId": uuidv4().toString(),
      },
      params: {
        "api-version": "3.0",
        from: dataa.source !== "auto" ? dataa.source : "", // Empty string if "auto"
        to: dataa.target,
      },
      data: [
        {
          text: dataa.textsource,
        },
      ],
      responseType: "json",
    });

    // Extract the translated text
    const translatedText = response.data[0].translations[0].text;
    if (dataa.source === "auto") {
      dataa.source = response.data[0].detectedLanguage.language;
    }
    try {
      const translationData = {
        source: dataa.source,
        target: dataa.target,
        textsource: dataa.textsource,
        texttarget: translatedText,
      };
      const result = await addTranslation(userId, translationData);
      revalidateTag("translationHistory");
      console.log("Translation added successfully:", result);
    } catch (error) {
      console.error("Failed to add translation:", error);
    }
    console.log(translatedText, "Translated text");
    return translatedText; // Return the translated text
  } catch (error: any) {
    console.error("Translation error: ", error.message);
    throw new Error("Translation failed. Please try again.");
  }
}

export async function deleteTranslation(id: string) {
  auth().protect();
  const { userId } = auth();
  try {
    const response = await removeTranslation(id, userId!);
    revalidateTag("translationHistory");
    console.log("resssssssssssssssponsz", response);
    return response;
  } catch (error) {
    console.error("Error removing translation:", error);
    return { success: false, message: "Error removing translation" };
  }
}
