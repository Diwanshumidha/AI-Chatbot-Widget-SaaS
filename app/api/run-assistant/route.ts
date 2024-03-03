import { NextResponse } from "next/server";
import OpenAI, { ClientOptions } from "openai";

const openaiOptions: ClientOptions = {
  apiKey: process.env.OPENAI_API_KEY || "",
};

const openai = new OpenAI(openaiOptions);

export async function POST(request: Request) {
  const body = await request.json();

  //  retrieve the assistant
  const assistant = await openai.beta.assistants.retrieve(
    "asst_Nigd6t9KsAxNynBIG7bVM22r"
  );

  console.log("assistant", assistant);

  // Create a new thread
  const thread = await openai.beta.threads.create();
  console.log("thread", thread);

  
  return NextResponse.json({
    thread: thread.id,
    welcomeMessage: "Hi, how can I help you today?",
  });
}
