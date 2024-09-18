"use client";
import React, { useEffect, useState } from "react";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { TranslationData } from "@/lib/Types"
const TranslateForm = ({ languages }: { languages: LanguageData }) => {
  const [translatedText, setTranslatedText] = useState("");

  const FormSchema = z.object({
    source: z.string({
      required_error: "Please select an email to display.",
    }),
    target: z.string({
      required_error: "Please select an email to display.",
    }),
    textsource: z
      .string()
      .min(10, {
        message: "Bio must be at least 10 characters.",
      })
      .max(160, {
        message: "Bio must not be longer than 30 characters.",
      }),
    texttarget: z
      .string()
      .optional()
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
        source: "auto",
        target:'',
        textsource:"",
        texttarget:"",

      },
  });

  async function onSubmit(dataa: z.infer<typeof FormSchema>) {
    try {
        const translatedText = await translate(dataa as TranslationData);
        form.setValue("texttarget", translatedText);
        setTranslatedText(translatedText)

      } catch (error) {
        console.error("Translation error:", error);
        // You might want to show an error message to the user here
      }
  }

  useEffect(()=>{
    // console.log(translatedText)
  },[translatedText])

  return (
    <div className="max-w-6xl w-full mx-auto px-2 my-4 bg-white rounded-lg shadow-md">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="">
          <div className="flex flex-wrap items-center md:p-4 p-2 border-b">
            <button className="flex items-center space-x-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-md mr-4 mb-2 md:mb-0">
              <FileText size={18} />
              <span>Text</span>
            </button>
            <button className="flex items-center space-x-2 text-gray-600 px-3 py-1 rounded-md">
              <Mic size={18} />
              <span>Speak</span>
            </button>
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
                          <SelectTrigger className="w-[250px]">
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
                <Volume2 size={18} className="text-gray-400 cursor-pointer" />
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
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-[250px]">
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
                <Volume2 size={18} className="text-gray-400 cursor-pointer" />
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
              className="bg-blue-800 text-white px-4 py-2 rounded-md hover:bg-blue-900 transition duration-300"
              type="submit"
            >
              Translate
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default TranslateForm;
