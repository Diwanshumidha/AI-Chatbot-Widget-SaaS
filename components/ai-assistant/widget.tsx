"use client";

import { FaRocketchat } from "react-icons/fa";
import { Button } from "../ui/button";
import { FaMinus } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { LuDot } from "react-icons/lu";
import { useEffect, useRef, useState } from "react";
import { LuArrowUpRight } from "react-icons/lu";
import { Input } from "../ui/input";
import { useThread } from "@/hooks/use-thread";
import { useMessages } from "@/hooks/use-messages";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { GoDotFill } from "react-icons/go";
import { Skeleton } from "@/components/ui/skeleton";
import { FormError } from "../auth/form-error";
import useOnClickOutside from "@/hooks/useOnClickOutside";

const Widget = () => {
  const [chatBox, setChatBox] = useState(false);
  const { messages, setMessages } = useMessages();
  const [userMessage, setUserMessage] = useState("");
  const [assistantMessage, setAssistantMessage] = useState("");
  const [showChat, setShowChat] = useState(false);
  const { threadId, setThreadId } = useThread();
  const [threadLoading, setThreadLoading] = useState(false);
  const [generationLoading, setGenerationLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);

  // const scrollTriggerRef = useRef<>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null); // Ref for the element to scroll to
  const widgetContainerRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useOnClickOutside(widgetContainerRef, () => {
    setChatBox(false);
  });

  // Start a conversation/thread with the assistant
  const createThread = async () => {
    // show chat box
    try {
      setError("");
      setChatBox(!chatBox);
      if (threadId) {
        setThreadId(threadId);
        setShowChat(true);
        setThreadLoading(false);
        return;
      }
      setThreadLoading(true);

      const response = await fetch("/api/run-assistant", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });

      const data = await response.json();
      if (!response.ok) {
        throw Error("Error While Creating the chat");
      }

      if (!data.thread || !data.welcomeMessage) {
        throw Error("Error While Creating the chat in welcome");
      }
      const thread: string = data.thread;
      setThreadId(thread);
      setShowChat(true);
      setMessages((prev) => [
        ...prev,
        { from: "chatbot", message: data.welcomeMessage },
      ]);
    } catch {
      setError(
        "There Was an Error While Loading the ChatBot Refresh The Browser"
      );
    } finally {
      setThreadLoading(false);
    }
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

  // calls the scrollToBottom function when the messages array changes to scroll to the bottom of the chat area
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="fixed bottom-5 right-5 p-3 z-[150]">
      {/* The widget at the bottom right which starts a new thread onClick */}
      <Button
        onClick={() => createThread()}
        className="bg-orange-500 p-7 justify-center flex items-center rounded-full hover:bg-orange-500/70"
      >
        {chatBox ? (
          <IoClose className="w-8 h-8 text-white cursor-pointer" />
        ) : (
          <FaRocketchat className="w-8 h-8 text-white cursor-pointer" />
        )}
      </Button>

      {/* Parent div of the chat box */}
      {chatBox && (
        <div ref={widgetContainerRef} className="bg-white absolute mb-4 break-words flex flex-col bottom-full justify-between shadow-lg right-0 rounded-2xl w-96 h-[60dvh]">
          {/* Start of orange header for chatbox */}
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
          {threadLoading && messages.length <= 0 ? <WidgetLoader /> : null}
          {error ? (
            <div className=" px-4 py-2">
              <FormError message={error} />
            </div>
          ) : null}
          {/* Parent element for the chat area below orange header */}
          <ScrollArea className="h-full w-full mt-6 space-y-2 py-2 text-sm">
            {
              messages.map((message, index) => (
                <div
                  key={`LoadingPointsWidget-${index}`}
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
            {/* The loader for when the Assistant API is thinking of an answer */}
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
            {/* This div is for scrolling to the bottom of the chat box when new messages appear */}
            <div ref={messagesEndRef} />
          </ScrollArea>
          {/* The input that allows the user to chat to the assistant's API */}
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
              <Button type="submit" className="border-s-0" disabled={!threadId}>
                <LuArrowUpRight size={25} />
              </Button>
            </form>
          )}
        </div>
      )}
    </div>
  );
};

export default Widget;

const WidgetLoader = () => {
  return (
    <div className=" w-full flex flex-col gap-2 mt-6 px-4 py-2">
      <Skeleton className=" w-3/4 h-[24px] self-start" />
    </div>
  );
};
