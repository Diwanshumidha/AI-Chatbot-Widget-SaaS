"use client"

import { Dispatch, SetStateAction, createContext, useContext, useState } from "react";

type TAssistantContext = {
  threadId: string,
  setThreadId: Dispatch<SetStateAction<string>>
}

export const AssistantContext = createContext<TAssistantContext | null>(null);

export function AssistantContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [threadId, setThreadId] = useState("");
console.log("Thread Id", threadId)
  return (
    <AssistantContext.Provider
      value={{
        threadId,
        setThreadId,
      }}
    >
      {children}
    </AssistantContext.Provider>
  );
}