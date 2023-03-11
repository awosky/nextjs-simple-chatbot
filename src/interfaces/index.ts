import { RefObject } from "react";

export interface Message {
  role: "user" | "assistant";
  content: string;
}

export interface MessageContext {
  messages: Message[] | [];
  isTyping: boolean;
  isLoading: boolean;
  submitMessage: (message: string) => void;
  resetMessage: () => void;
  lastMessageRef: RefObject<HTMLDivElement>;
}
