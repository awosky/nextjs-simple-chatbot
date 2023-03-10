export interface Message {
  type: "user" | "server";
  message: string;
}

export interface MessageContext {
  messages: Message[] | [];
  isTyping: boolean;
  submitMessage: (message: string) => void;
  resetMessage: () => void;
}
