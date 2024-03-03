import { AssistantContext } from "@/context/assistant-context";
import { useContext } from "react";

export const useThread = () => {
  const context = useContext(AssistantContext);

  if (context === null) {
    throw new Error("useThread must be used within a AssistantContextProvider");
  }
 

  return context;
};
