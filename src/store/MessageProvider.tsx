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
  loading: false,
  submitMessage: () => null,
  resetMessage: () => null,
});

const MessageProvider = ({ children }: { children: JSX.Element }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setMessages(getMessages());
  }, [setMessages]);

  useEffect(() => {
    const isResponded = messages.length % 2 === 0;
    if (isResponded && loading) setLoading(false);
  }, [loading, messages]);

  const updateMessage = (newMessages: Message[]) => {
    setMessages(newMessages);
    saveMessages(newMessages);
  };

  const submitMessage = useCallback(
    async (message: string) => {
      const newMessages: Message[] = [...messages, { type: "user", message }];
      updateMessage(newMessages);
      setTimeout(() => setLoading(true), 800);
      const res = await getResponse(message);
      updateMessage([...newMessages, { type: "server", message: res.result }]);
      setLoading(false);
    },
    [messages]
  );

  const resetMessage = () => {
    setMessages([]);
    clearMessages();
  };

  const value = useMemo(
    () => ({ messages, loading, submitMessage, resetMessage }),
    [loading, messages, submitMessage]
  );

  return (
    <MessageContext.Provider value={value}>{children}</MessageContext.Provider>
  );
};

export default MessageProvider;
