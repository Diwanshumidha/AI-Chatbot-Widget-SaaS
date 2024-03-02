import { NextResponse } from "next/server";
import OpenAI, { ClientOptions } from "openai";
import { database } from "@/lib/prismadb";
import { auth } from "@/auth";

const openaiOptions: ClientOptions = {
  apiKey: process.env.OPENAI_API_KEY || "",
};

const openai = new OpenAI(openaiOptions);

export async function POST(request: Request) {
    const body = await request.json();
    const { name, description, welcomeMessage, colorScheme, knowledgeBase } = body;
  // retreive the user's session
  const session = await auth();

  // If no session is found, return an error message
  if (!session) {
    return NextResponse.json({
      message: "You are not authorized to perform this action",
    });
  }
  const { email } = session.user;

  const checkforAssistant = await database.user.findFirst({
    where: {
      email,
    },
  });
  console.log("checkforAssistant", checkforAssistant);
  if (checkforAssistant?.numberOfAssistants === 1) {
    return NextResponse.json({
      error: "You have reached the maximum number of assistants, please upgrade your account",
    });
  } else {
    const assistant = await openai.beta.assistants.create({
      name: name,
      instructions:
       description,
      tools: [{ type: "retrieval" }],
      model: "gpt-3.5-turbo",
    });

    await database.user.update({
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
  }

  return NextResponse.json({ success: "Assistant created successfully" });
}
