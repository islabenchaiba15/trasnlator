"use client";

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
import { Trash } from "lucide-react";
import { deleteTranslation } from "@/actions/translate.actions";
import { useToast } from "@/hooks/use-toast";

const FormSchema = z.object({});

const Delete = ({ id }: { id: string }) => {
    const { toast } = useToast()
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const response = await deleteTranslation(id);
      console.log("resssssssssssssss", response);
      if (response.success===true) {
        toast({
          title: response.message,
          description: "successfully translated your text",
        });
      } else {
        toast({
          title: response.message,
          description: "There was a problem with your request.",
        });
      }
    } catch (error) {
      console.error("Translation error:", error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="">
        <Button
          type="submit"
          variant={"outline"}
          className="border cursor-pointer hover:bg-red-500 hover:text-white text-red-500 border-red-600 p-2 "
        >
          <Trash size={16} />
        </Button>
      </form>
    </Form>
  );
};

export default Delete;
