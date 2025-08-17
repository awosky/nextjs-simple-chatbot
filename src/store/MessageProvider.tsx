import {
  createContext,
  createRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { Message, MessageContext as IMessageContext } from "@/interfaces";
import { getResponse } from "@/services/geminiAI";
import { clearMessages, getMessages, saveMessages } from "@/utils/localStorage";

export const MessageContext = createContext<IMessageContext>({
  messages: [],
  isTyping: false,
  isLoading: false,
  submitMessage: () => null,
  resetMessage: () => null,
  lastMessageRef: createRef<HTMLDivElement>(),
});

const MessageProvider = ({ children }: { children: JSX.Element }) => {
  const lastMessageRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setMessages(getMessages());
  }, [setMessages]);

  useEffect(() => {
    const isResponded = messages.length % 2 === 0;
    if (isResponded && isTyping) setIsTyping(false);
  }, [isTyping, messages]);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const updateMessage = (newMessages: Message[]) => {
    setMessages(newMessages);
    saveMessages(newMessages);
  };

  const submitMessage = useCallback(
    async (message: string) => {
      const newMessages: Message[] = [
        ...messages,
        { role: "user", content: message },
      ];
      updateMessage(newMessages);
      try {
        setTimeout(() => setIsTyping(true), 800);
        const res = await getResponse(newMessages);
        updateMessage([...newMessages, { role: "assistant", content: res }]);
      } catch (error) {
        updateMessage([...newMessages, { role: "assistant", content: "😿" }]);
      } finally {
        setIsTyping(false);
      }
    },
    [messages]
  );

  const resetMessage = () => {
    setMessages([]);
    clearMessages();
  };

  const value = useMemo(
    () => ({
      messages,
      isTyping,
      isLoading,
      submitMessage,
      resetMessage,
      lastMessageRef,
    }),
    [isLoading, isTyping, messages, submitMessage]
  );

  return (
    <MessageContext.Provider value={value}>{children}</MessageContext.Provider>
  );
};

export default MessageProvider;
