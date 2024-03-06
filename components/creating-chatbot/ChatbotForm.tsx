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
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { Button } from "../ui/button";
import { useState } from "react";
import { ChatbotSchema } from "@/schemas";
import ChatbotPrototype from "./ChatbotPrototype";
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/css";
import axios from "axios";

const ChatbotForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [logoState, setLogoState] = useState("");
  const [color, setColor] = useColor("#121212");

  const form = useForm<z.infer<typeof ChatbotSchema>>({
    resolver: zodResolver(ChatbotSchema),

    defaultValues: {
      name: "",
      instructions: "",
      welcomeMessage: "",
      colorScheme: {
        hex: "#f97316",
        rgb: {
          r: 249,
          g: 115,
          b: 22,
          a: 1,
        },
        hsv: {
          h: 24.581497797356832,
          s: 91.16465863453816,
          v: 97.6470588235294,
          a: 1,
        },
      },
      logo: undefined,
      knowledgeBase: undefined,
    },
  });

  const { watch, setValue, register, formState } = form;

 

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
  const instructions = watch("instructions");
  const welcomeMessage = watch("welcomeMessage");
  const colorScheme = watch("colorScheme");
  const knowledgeBase = watch("knowledgeBase");

  const onSubmit = async (data: z.infer<typeof ChatbotSchema>) => {
    console.log(data);
    const formdata = new FormData();
    formdata.append("logo", data.logo[0]);
    formdata.append("name", data.name);
    formdata.append("instructions", data.instructions);
    formdata.append("welcomeMessage", data.welcomeMessage);
    for (let index = 0; index < data.knowledgeBase.length; index++) {
      const file = data.knowledgeBase[index];
      formdata.append(`knowledgeBase`, file);
    }
    formdata.append("colorScheme", data.colorScheme.hex);
    console.log(formdata);
    const response = await axios.post("/api/create-assistant", formdata, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (response.data.error) {
      setError(response.data.error);
    } else {
      setSuccess(response.data.success);
    }
  };

  return (
    <div className="w-full py-10 flex lg:flex-row flex-col justify-center mx-auto">
      <div className="basis-1/2 px-16 flex-1">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Chatbot Name</FormLabel>
                    <FormDescription>
                      Choose a name for your chatbot.
                    </FormDescription>
                    <FormControl>
                      <Input {...field} placeholder="" type="text" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="instructions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Give Instructions to Your Chatbot</FormLabel>
                    <FormDescription>
                      This will tell the chatbot how to interact with your
                      users.
                    </FormDescription>
                    <FormControl>
                      <Input {...field} placeholder="" />
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
                      <Input {...field} placeholder="" />
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
              <FormField
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
              />
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
                      <Input
                        {...register("knowledgeBase")}
                        type="file"
                        // accept="image/*"
                        multiple
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {success && (
              <p className="text-green-500 bg-green-500/20 p-2 rounded-lg">
                {success}
              </p>
            )}
            {error && (
              <p className="text-red-500 bg-red-500/30 p-2 rounded-lg">
                {error}
              </p>
            )}
            <Button type="submit" className="w-full" disabled={formState.isSubmitting}>
              {formState.isSubmitting ? "Loading..." : "Create Your Chatbot"}
            </Button>
          </form>
        </Form>
      </div>
      <div className="basis-1/2 flex-1 flex justify-center">
        <ChatbotPrototype
          name={name}
          colorScheme={colorScheme.hex}
          welcomeMessage={welcomeMessage}
          logoState={logoState}
        />
      </div>
    </div>
  );
};

export default ChatbotForm;




{/* <script type="text/javascript">
  (function(d, t) {
      var v = d.createElement(t), s = d.getElementsByTagName(t)[0];
      v.onload = function() {
        window.voiceflow.chat.load({
          verify: { projectID: '655e9a9073f76b00076ed256' },
          url: 'https://general-runtime.voiceflow.com',
          versionID: 'production'
        });
      }
      v.src = "https://cdn.voiceflow.com/widget/bundle.mjs"; v.type = "text/javascript"; s.parentNode.insertBefore(v, s);
  })(document, 'script');
</script> */}