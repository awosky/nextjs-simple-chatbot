import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import { Message, MessageContext as IMessageContext } from "@/interfaces";
import { getResponse } from "@/services/openApi";
import { clearMessages, getMessages, saveMessages } from "@/utils/localStorage";

export const MessageContext = createContext<IMessageContext>({
  messages: [],
  isTyping: false,
  isLoading: false,
  submitMessage: () => null,
  resetMessage: () => null,
});

const MessageProvider = ({ children }: { children: JSX.Element }) => {
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
    console.log(isLoading);
  }, [isLoading]);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const updateMessage = (newMessages: Message[]) => {
    setMessages(newMessages);
    saveMessages(newMessages);
  };

  const submitMessage = useCallback(
    async (message: string) => {
      const newMessages: Message[] = [...messages, { type: "user", message }];
      updateMessage(newMessages);
      setTimeout(() => setIsTyping(true), 800);
      const res = await getResponse(message);
      updateMessage([...newMessages, { type: "server", message: res.result }]);
      setIsTyping(false);
    },
    [messages]
  );

  const resetMessage = () => {
    setMessages([]);
    clearMessages();
  };

  const value = useMemo(
    () => ({ messages, isTyping, isLoading, submitMessage, resetMessage }),
    [isLoading, isTyping, messages, submitMessage]
  );

  return (
    <MessageContext.Provider value={value}>{children}</MessageContext.Provider>
  );
};

export default MessageProvider;
