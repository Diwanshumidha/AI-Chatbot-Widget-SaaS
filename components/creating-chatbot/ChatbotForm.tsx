"use client";

import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { Button } from "../ui/button";
import { useState } from "react";
import { useFormStatus } from "react-dom";
import { ChatbotSchema } from "@/schemas";
import ChatbotPrototype from "./ChatbotPrototype";
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/css";

const ChatbotForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { pending } = useFormStatus();
  const [logoState, setLogoState] = useState("");
  const [color, setColor] = useColor("#121212");

  const form = useForm<z.infer<typeof ChatbotSchema>>({
    resolver: zodResolver(ChatbotSchema),

    defaultValues: {
      name: "",
      description: "",
      welcomeMessage: "",
      colorScheme: {
        hex: "",
        rgb: { r: 0, g: 0, b: 0, a: 1 },
        hsv: { h: 0, s: 0, v: 0, a: 1 },
      },
      // logo: "",
      knowledgeBase: "",
    },
  });

  const { watch, setValue, register } = form;

  const uploadingLogo = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      console.log(imageUrl);
      setLogoState(imageUrl); // Set the image to the state (for previewing the image in the form
      // setValue("logo", file.name); // Set the value of the 'image' field in the form
    }
  };

  const name = watch("name");
  // const logo = watch("logo");
  const description = watch("description");
  const welcomeMessage = watch("welcomeMessage");
  const colorScheme = watch("colorScheme");
  const knowledgeBase = watch("knowledgeBase");

  const onSubmit = async (data: z.infer<typeof ChatbotSchema>) => {
    console.log(data);
    await fetch("/api/create-assistant", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setSuccess(data.success);
        }
      });
  };

  return (
    <div className="w-full pt-10 flex md:flex-row flex-col">
      <div className="basis-1/2 px-16">
        <h1 className="text-3xl font-semibold text-center mb-6">
          Create Your Chatbot in just a few steps
        </h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Chatbot Name</FormLabel>
                    <FormDescription>
                      Choose a name for your chatbot.
                    </FormDescription>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Chatty Assistant"
                        type="text"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Describe your chatbot</FormLabel>
                    <FormDescription>
                      Let your visitors know about your assistant.
                    </FormDescription>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="fun, and bubbly personality "
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="welcomeMessage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Create a Welcome Message</FormLabel>
                    <FormDescription>
                      This will be the first message your visitors see.
                    </FormDescription>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Hi, I'm Chatty! How can I help you today?"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="colorScheme"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Color Scheme</FormLabel>
                    <FormDescription>
                      Choose a color scheme for your chatbot.
                    </FormDescription>
                    <FormControl>
                      <>
                        <ColorPicker
                          color={field.value}
                          hideInput={["rgb", "hsv"]}
                          onChange={field.onChange}
                        />
                      </>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* <FormField
                control={form.control}
                name="logo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Logo</FormLabel>
                    <FormDescription>
                      Upload a logo for your chatbot.
                    </FormDescription>
                    <FormControl>
                      <Input
                        {...register("logo")}
                        type="file"
                        accept="image/*"
                        onChange={uploadingLogo}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}
              <FormField
                control={form.control}
                name="knowledgeBase"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Knowledge Base</FormLabel>
                    <FormDescription>
                      Upload files to train your chatbot so it can be custom to
                      your website.
                    </FormDescription>

                    <FormControl>
                      <Input {...field} type="file" multiple />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {success && (
              <p className="text-green-500 bg-green-500/70 p-2 rounded-lg">
                {success}
              </p>
            )}
            {error && (
              <p className="text-red-500 bg-red-500/30 p-2 rounded-lg">
                {error}
              </p>
            )}
            <Button type="submit" className="w-full" disabled={pending}>
              {pending ? "Loading..." : "Create Your Chatbot"}
            </Button>
          </form>
        </Form>
      </div>
      <div className="basis-1/2">
        <ChatbotPrototype
          name={name}
          colorScheme={colorScheme.hex}
          welcomeMessage={welcomeMessage}
          // logo={logo}
          logoState={logoState}
        />
      </div>
    </div>
  );
};

export default ChatbotForm;
