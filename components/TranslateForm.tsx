"use client";
import React, { useEffect, useRef, useState } from "react";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFormContext } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { ChevronDown, Volume2, FileText, Mic } from "lucide-react";
import { LanguageData } from "@/lib/Types";
import { SelectGroup, SelectLabel } from "@radix-ui/react-select";
import { Textarea } from "./ui/textarea";
import { translate } from "@/actions/translate.actions";
import { TranslationData } from "@/lib/Types";
import SubmitButton from "./Botton";
import AudioRecorder from "./Recorder";
const TranslateForm = ({ languages }: { languages: LanguageData }) => {
  const [translatedText, setTranslatedText] = useState("");

  const { register, watch } = useForm();

  // Watching the "source" field
  const [pending, setPending] = useState(false);

  const FormSchema = z.object({
    source: z.string({
      required_error: "Please select a language",
    }),
    target: z.string({
      required_error: "Please select a lanuage",
    }),
    textsource: z
      .string()
      .min(2, {
        message: "text must be at least 2 characters.",
      })
      .max(160, {
        message: "text must not be longer than 30 characters.",
      }),
    texttarget: z.string().optional(),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      source: "auto",
      target: "en",
      textsource: "",
      texttarget: "",
    },
  });
  const sourceValue = form.watch("textsource");
  const targetValue = form.watch("texttarget");
  async function onSubmit(dataa: z.infer<typeof FormSchema>) {
    try {
      console.log(dataa, "oooooo");
      const translatedText = await translate(dataa as TranslationData);
      form.setValue("texttarget", translatedText);
      setTranslatedText(translatedText);
    } catch (error) {
      console.error("Translation error:", error);
      // You might want to show an error message to the user here
    }
  }
  const [isSpeaking, setIsSpeaking] = useState(false);
  const bottonRef = useRef<HTMLButtonElement>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  //     useEffect(() => {
  //       const sourceValue = form.watch("source");
  //  // Log button reference

  //       if (!sourceValue.trim()) return;

  //       const delayDebounceFn = setTimeout(() => {
  //         bottonRef.current?.click();
  //         setPending(true);
  //       }, 500);
  //       return () => clearTimeout(delayDebounceFn);
  //     }, [form.watch("source"),form.watch("target"),form.watch("textsource")]);

  useEffect(() => {
    console.log(translatedText);
  }, [translatedText]);
  const speak = async () => {
    const synth = window.speechSynthesis;
    if (!synth || !targetValue) return;

    const utterance = new SpeechSynthesisUtterance(targetValue);
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    synth.speak(utterance);
  };

  const uploadAudio = async (blob: Blob) => {
    const mimeType = "audio/webm";
    const file = new File([blob], "audio.webm", { type: mimeType });
    const formData = new FormData();
    formData.append("audio", file);

    const url =
      process.env.NODE_ENV === "development"
        ? `http://localhost:3000/api/translateAudio`
        : `${process.env.AZURE_URL}/api/translateAudio`;

    try {
      const response = await fetch(url, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      console.log("dataaaaaaaaaaaaaaa", data);
      if (data.text) {
        // Assuming you have a form hook to set the transcription value
        const textSource = data.text;
        form.setValue("textsource", textSource);
        bottonRef.current && (bottonRef.current.disabled = false);

        bottonRef.current?.click();
      } else {
        console.error("Transcription error:", data);
      }
    } catch (error) {
      console.error("Error uploading audio:", error);
    }
  };

  return (
    <div className="max-w-6xl w-full mx-auto px-2 my-4 bg-white rounded-lg shadow-md">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="">
          <div className="flex flex-wrap items-center md:p-4 p-2 border-b">
            {/* <button className="flex items-center space-x-2 px-3 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors">
              <FileText size={18} />
              <span className="text-sm font-bold">Text</span>
            </button> */}
            <AudioRecorder uploadAudio={uploadAudio} />
          </div>
          <div className="flex flex-col md:flex-row">
            <div className="flex-1 p-4 md:border-r">
              <div className="flex justify-between items-center mb-2">
                <FormField
                  control={form.control}
                  name="source"
                  render={({ field }) => (
                    <FormItem>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue="auto"
                      >
                        <FormControl>
                          <SelectTrigger className="w-[250px] border-none text-blue-600 active:border-none font-bold">
                            <SelectValue placeholder="Select a language" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="p-2">
                          <SelectGroup>
                            <SelectLabel className="font-bold text-sm">
                              Want us to figure out ?
                            </SelectLabel>
                            <SelectItem key="auto" value="auto">
                              auto detection
                            </SelectItem>
                          </SelectGroup>
                          <SelectGroup>
                            <SelectLabel className="font-bold text-sm">
                              Languages
                            </SelectLabel>
                            {Object.entries(languages.translation).map(
                              ([code, language]) => (
                                <SelectItem
                                  className="text-black"
                                  key={code}
                                  value={code}
                                >
                                  {language.name}
                                </SelectItem>
                              )
                            )}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* <Button
                  type="button"
                  variant="ghost"
                  className=""
                  disabled={!sourceValue}
                >
                  <Volume2 size={20} className="text-blue-400 cursor-pointer" />
                </Button> */}
              </div>
              <FormField
                control={form.control}
                name="textsource"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        className="w-full h-48 resize-none border rounded-md p-2"
                        placeholder="Type your message here."
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex-1 p-4">
              <div className="flex justify-between items-center mb-2">
                <FormField
                  control={form.control}
                  name="target"
                  render={({ field }) => (
                    <FormItem>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={"en"}
                      >
                        <FormControl>
                          <SelectTrigger className="w-[250px] border-none text-blue-600 active:border-none font-bold">
                            <SelectValue placeholder="Select a language" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="p-2">
                          <SelectGroup>
                            <SelectLabel className="font-bold text-sm">
                              Languages
                            </SelectLabel>
                            {Object.entries(languages.translation).map(
                              ([code, language]) => (
                                <SelectItem
                                  className="text-black"
                                  key={code}
                                  value={code}
                                >
                                  {language.name}
                                </SelectItem>
                              )
                            )}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  variant="ghost"
                  type="button"
                  onClick={speak}
                  className=""
                  disabled={!targetValue}
                >
                  <Volume2 size={20} className="text-blue-400 cursor-pointer" />
                </Button>{" "}
              </div>
              <FormField
                control={form.control}
                name="texttarget"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        className="w-full h-48 resize-none border rounded-md p-2"
                        placeholder="Translation will appear here."
                        {...field}
                        readOnly
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="flex justify-end p-4">
            <Button
              ref={bottonRef}
              className="bg-blue-800 text-white px-4 py-2 rounded-md hover:bg-blue-900 transition duration-300"
              type="submit"
              disabled={!form.watch("textsource")}
            >
              translate
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default TranslateForm;
