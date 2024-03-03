"use client";

import { FaRocketchat } from "react-icons/fa";
import { Button } from "../ui/button";
import { FaMinus } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { LuDot } from "react-icons/lu";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import { LuArrowUpRight } from "react-icons/lu";
import { Input } from "../ui/input";
import { useThread } from "@/hooks/use-thread";
import { useMessages } from "@/hooks/use-messages";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { GoDotFill } from "react-icons/go";

const Widget = () => {
  const [chatBox, setChatBox] = useState(false);
  const { messages, setMessages } = useMessages();
  const [userMessage, setUserMessage] = useState("");
  const [assistantMessage, setAssistantMessage] = useState("");
  const [showChat, setShowChat] = useState(false);
  const { threadId, setThreadId } = useThread();
  const [threadLoading, setThreadLoading] = useState(false);
  const [generationLoading, setGenerationLoading] = useState(false);

  // const scrollTriggerRef = useRef<>(null);

  const messagesEndRef = useRef<HTMLDivElement | null>(null); // Ref for the element to scroll to

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const createThread = async () => {
    setChatBox(!chatBox);
    setThreadLoading(true);
    if (threadId) return;

    const response = await fetch("/api/run-assistant", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    });

    const data = await response.json();
    console.dir(data, {
      depth: null,
    });
    const thread: string = data.thread;
    setThreadId(thread);
    setShowChat(true);
    setMessages((prev) => [
      ...prev,
      { from: "chatbot", message: data.welcomeMessage },
    ]);

    setThreadLoading(false);
    // scrollTriggerRef?.focus();
  };

  const handleUserMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUserMessage("");
    setGenerationLoading(true);
    setMessages((prev) => [...prev, { from: "user", message: userMessage }]);
    const response = await fetch("/api/answer-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: userMessage, threadId: threadId }),
    });
    console.log(response);
    const data = await response.json();
    console.dir(data, {
      depth: null,
    });
    setGenerationLoading(false);
    setMessages((prev) => [...prev, { from: "chatbot", message: data }]);
  };

  const handleChatBox = () => {
    setChatBox(!chatBox);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="fixed bottom-5 right-5 p-3 z-[150]">
      <Button
        onClick={() => createThread()}
        className="bg-orange-500 p-7 justify-center flex items-center rounded-full hover:bg-orange-500/70"
      >
        <FaRocketchat className="w-8 h-8 text-white cursor-pointer" />
      </Button>
      {chatBox && !threadLoading && (
        <div className="bg-white absolute mb-4 break-words flex flex-col bottom-full justify-between right-0 rounded-2xl w-96 h-[60dvh]">
          {/* {!showChat && (
            <div className="flex justify-center items-center w-full h-full">
              <Button onClick={() => createThread()}>Start Conversation</Button>
            </div>
          )} */}
          {/* {showChat && ( */}
          <div className="justify-between p-3 flex items-center bg-orange-500 rounded-t-2xl rounded-b-none text-white">
            <div className="flex items-center">
              <LuDot className="text-green-500 animate-pulse" size={40} />
              <h2 className="text-lg font-bold text-center">
                Chatty Assistant
              </h2>
            </div>
            <div className="flex space-x-3">
              <FaMinus
                onClick={() => handleChatBox()}
                className="cursor-pointer hover:text-black/60"
              />
              <IoClose
                onClick={() => handleChatBox()}
                className="cursor-pointer hover:text-black/60"
              />
            </div>
          </div>
          {/* )} */}
          <ScrollArea className="h-full w-full mt-6 space-y-2 py-2 text-sm">
            {showChat &&
              messages.map((message, index) => (
                <div
                  key={index}
                  className={cn(
                    "flex flex-1 px-4",
                    message?.from === "user"
                      ? "justify-end w-full"
                      : "justify-start w-full"
                  )}
                >
                  <div
                    className={cn(
                      "flex gap-y-1",
                      message?.from === "user"
                        ? "justify-end p-1.5 rounded-3xl w-3/4"
                        : "justify-start w-3/4"
                    )}
                  >
                    <span
                      className={cn(
                        message?.from === "user"
                          ? "w-fit bg-orange-500 px-3 py-2 rounded-lg text-white text-end mb-2"
                          : "w-fit bg-slate-100 px-3 py-2 text-start rounded-lg mb-2"
                      )}
                    >
                      {message?.message}
                    </span>
                  </div>
                </div>
              ))}
            {generationLoading && (
              <div className="px-4">
                <p className="flex break-words py-1 text-start rounded-lg mb-2 w-1/3 text-slate-500 text-sm">
                  {Array.from({ length: 3 }).map((_, index) => (
                    <GoDotFill
                      className={`animate-bounce delay-${index * 100} `}
                      size={18}
                    />
                  ))}
                </p>
              </div>
            )}
            <div ref={messagesEndRef} />
          </ScrollArea>
          {showChat && !threadLoading && (
            <form
              onSubmit={(e) => handleUserMessage(e)}
              className="flex flex-row bg-white p-4"
            >
              <Input
                value={userMessage}
                onChange={(e) => setUserMessage(e.target.value)}
                className="w-full flex justify-end items-end focus-visible:ring-transparent focus:ring-0 focus px-4 rounded-r-none text-sm"
                placeholder="Message..."
                aria-label="Type here"
              />
              <Button type="submit" className="border-s-0">
                <LuArrowUpRight size={25} />
              </Button>
            </form>
          )}
          {threadLoading && (
            <div className="bg-white absolute mb-4 break-words flex flex-col bottom-full justify-between right-0 rounded-2xl w-96 h-[60dvh]">
              <div className="px-4">
                <p className="flex break-words py-1 text-start rounded-lg mb-2 w-1/3 text-slate-500 text-sm">
                  {Array.from({ length: 3 }).map((_, index) => (
                    <GoDotFill
                      className={`animate-bounce delay-${index * 100} `}
                      size={18}
                    />
                  ))}
                </p>
              </div>
            </div>
          )}
          {/*  */}
        </div>
      )}
    </div>
  );
};

export default Widget;
