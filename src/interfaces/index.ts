export interface Message {
  type: "user" | "server";
  message: string;
}

export interface MessageContext {
  messages: Message[] | [];
  loading: boolean;
  submitMessage: (message: string) => void;
  resetMessage: () => void;
}
