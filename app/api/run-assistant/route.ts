import { NextResponse } from "next/server";
import OpenAI, { ClientOptions } from "openai";

//  retrieve the environment variables
const openaiOptions: ClientOptions = {
  apiKey: process.env.OPENAI_API_KEY || "",
};

//  create a new instance of the OpenAI client
const openai = new OpenAI(openaiOptions);

export async function POST(request: Request) {
  //  retrieve the body of the request
  const body = await request.json();

  //  retrieve the assistant
  const assistant = await openai.beta.assistants.retrieve(
    "asst_Nigd6t9KsAxNynBIG7bVM22r"
  );

  // Create a new thread
  const thread = await openai.beta.threads.create();
  
  // Send the thread id and welcome message to the client
  return NextResponse.json({
    thread: thread.id,
    welcomeMessage: "Hi, how can I help you today?",
  });
}
