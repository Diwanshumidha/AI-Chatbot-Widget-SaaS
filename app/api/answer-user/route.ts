import { NextResponse } from "next/server";
import OpenAI, { ClientOptions } from "openai";

const openaiOptions: ClientOptions = {
  apiKey: process.env.OPENAI_API_KEY || "",
};
const openai = new OpenAI(openaiOptions);

export async function POST(request: Request) {
  const body = await request.json();
  const { message, threadId } = body;

  const assistant = await openai.beta.assistants.retrieve(
    "asst_Nigd6t9KsAxNynBIG7bVM22r"
  );

  const userMessage = await openai.beta.threads.messages.create(threadId, {
    role: "user",
    content: message,
    
  });

  console.log("userMessage", userMessage);

  const run = await openai.beta.threads.runs.create(threadId, {
    assistant_id: assistant.id,
  });

  console.log("run", run);

  // retrieve the runs by id and check the status of the run.
  let runCheck = await openai.beta.threads.runs.retrieve(threadId, run.id);

  console.log("runCheck", runCheck);
  //   // wait for the run to finish because initialized as queued. So, we need to wait for it to finish.
  while (
    runCheck.status === "queued" ||
    runCheck.status === "in_progress" ||
    runCheck.status === "requires_action"
  ) {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    runCheck = await openai.beta.threads.runs.retrieve(threadId, run.id);
    console.log(runCheck);
  }

  // Retrieve messages from thread
  const messages = await openai.beta.threads.messages.list(threadId);
  console.log("messages", messages);

  // Get the last message from the assistant
  const lastMessageForRun = messages.data
    .filter(
      (message) => message.run_id === run.id && message.role === "assistant"
    )
    .pop();

  if (
    lastMessageForRun?.content &&
    !("text" in lastMessageForRun?.content[0])
  ) {
    return NextResponse.json(
      { error: "There was an Issue while generating The Response" },
      { status: 500 }
    );
  }

  //   [
  //     {
  //         "type": "text",
  //         "text": {
  //             "value": "Hello! Welcome to Chatty, your friendly SaaS platform assistant. I'm here to help you with anything related to implementing chatbots on your website.\n\nChatty's purpose is to simplify the integration of chatbot assistants on websites without the need for coding. Our platform enables effortless chatbot implementation, allowing users to create and customize their own AI assistants to enhance customer interactions and streamline business processes.\n\nI'm committed to assisting you in creating descriptive prompts for your AI assistants. Whether you're looking to personalize prompts for a specific purpose, audience, or unique features, I'm here to guide you through the process.\n\nI'd love to learn more about your chatbot's purpose, target audience, and any unique features you want to highlight. Clear communication of your preferences will help us tailor the prompts to align with your goals.\n\nLet's work together to craft personalized and effective prompts for your chatbot. I'm here to collaborate with you every step of the way.\n\nIs there anything specific you'd like to discuss or any questions you have about creating prompts for your chatbot?",
  //             "annotations": []
  //         }
  //     }
  // ]
  if (lastMessageForRun?.content[0].type !== "text") {
    return NextResponse.json(
      { error: "There was an Issue while generating The Response" },
      { status: 500 }
    );
  }
  console.log("lastMessageForRun", lastMessageForRun?.content[0].text?.value);
  return NextResponse.json(lastMessageForRun?.content[0].text?.value);
}
