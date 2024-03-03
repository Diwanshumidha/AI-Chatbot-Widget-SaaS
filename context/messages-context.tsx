"use client";

import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

export type TMessage = {
  message: string;
  from: "chatbot" | "user";
} | null

type TMessagesContext = {
  messages: TMessage[];
  setMessages: Dispatch<SetStateAction<TMessage[]>>;
};

export const MessagesContext = createContext<TMessagesContext | null>(null);

export function MessagesContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [messages, setMessages] = useState<TMessage[]>([]);
  console.log("Messages", messages);
  return (
    <MessagesContext.Provider value={{messages,setMessages}}>{children}</MessagesContext.Provider>
  );
}
