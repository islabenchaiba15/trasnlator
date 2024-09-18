'use server'

import { TranslationData } from "@/lib/Types"
import { auth } from "@clerk/nextjs/server"
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
const subscriptionKey = process.env.AZURE_TEXT_TRANSLATION_KEY;
const endpoint=process.env.AZURE_TEXT_TRANSLATION;
const location=process.env.AZURE_TEXT_LOCATION
export async function translate( dataa: TranslationData){
    auth().protect()
    const {userId}=auth()
    if(!userId) throw new Error("User not found")
        try {
            // Make the request to the Azure Translator API
            const response = await axios({
              baseURL: endpoint,
              url: '/translate',
              method: 'post',
              headers: {
                'Ocp-Apim-Subscription-Key': subscriptionKey,
                'Ocp-Apim-Subscription-Region': location, // Required for regional services
                'Content-type': 'application/json',
                'X-ClientTraceId': uuidv4().toString(),
              },
              params: {
                'api-version': '3.0',
                'from': dataa.source !== 'auto' ? dataa.source : '', // Empty string if "auto"
                'to': dataa.target,
              },
              data: [{
                'text': dataa.textsource,
              }],
              responseType: 'json',
            });
        
            // Extract the translated text
            const translatedText = response.data[0].translations[0].text;
            return translatedText; // Return the translated text
        
          } catch (error) {
            console.error("Translation error: ", error);
            throw new Error("Translation failed. Please try again.");
          }
        }