import { NextResponse } from "next/server";
import OpenAI, { ClientOptions } from "openai";
import { database } from "@/lib/prismadb";
import { auth } from "@/auth";
import { utapi } from "@/server/uploadthing";

const openaiOptions: ClientOptions = {
  apiKey: process.env.OPENAI_API_KEY || "",
};

const openai = new OpenAI(openaiOptions);

export async function POST(request: Request) {
  const formData = await request.formData();
  // const formData = await request.formData();
  console.log(formData);
  const name = formData.get("name") as string;
  const instructions = formData.get("instructions") as string;
  const logo = formData.get("logo") as File;
  const colorScheme = formData.get("colorScheme") as string;
  const knowledgeBase = Array.from(formData.getAll("knowledgeBase") as File[]);
  const welcomeMessage = formData.get("welcomeMessage") as string;
  console.log("knowledgeBase", knowledgeBase);
  console.log("logo", logo);

  // TODO: Validator

  const uploadedLogo = await utapi.uploadFiles(logo);
  if (uploadedLogo.error) {
    return;
  }
  if (!uploadedLogo.data.url || !uploadedLogo.data.key) {
    return;
  }
  // const knowledgeBaseFile = await utapi.uploadFiles(knowledgeBase);

  // retrieve the user's session
  const session = await auth();

  // If no session is found, return an error message
  if (!session) {
    return NextResponse.json({
      message: "You are not authorized to perform this action",
    });
  }

  // Destructure the email from the session object
  const { email } = session.user;

  // Check to see if an assistant is already created for the user based on their email
  const checkforAssistant = await database.user.findFirst({
    where: {
      email,
    },
  });

  console.log("checkforAssistant", checkforAssistant);

  // If an assistant is already created, return an error message
  if (checkforAssistant?.numberOfAssistants === 1) {
    return NextResponse.json({
      error:
        "You have reached the maximum number of assistants, please upgrade your account",
    });
  } else {
    let files: string[] = [];
    for (const file of knowledgeBase) {
      const currentfile = await openai.files.create({
        file,
        purpose: "assistants",
      });
      files.push(currentfile.id);
    }

    // Create a new assistant if one does not exist
    const assistant = await openai.beta.assistants.create({
      name: name as string,
      instructions: instructions as string,
      tools: [{ type: "retrieval" }],
      model: "gpt-3.5-turbo",
      file_ids: files,
    });

    console.log(assistant);
    // Update the user's assistantId and numberOfAssistants in the database
    const user = await database.user.update({
      where: {
        email: email ?? undefined,
      },
      data: {
        numberOfAssistants: {
          increment: 1,
        },
        assistantId: assistant.id,
      },
    });

    // Create a new chatbot in the database
    const chatbot = await database.chatbot.create({
      data: {
        chatBotName: name,
        instructions: instructions,
        welcomeMessage: welcomeMessage,
        colorScheme: colorScheme,
        assistantId: assistant.id,
        userId: user.id,
        logoUrl:uploadedLogo.data?.url,
        logoFileId: uploadedLogo.data?.key
      }
    });

    console.log("chatbot", chatbot);
  }

  // Send a success message to the client
  return NextResponse.json({ success: "Assistant created successfully" });
}
