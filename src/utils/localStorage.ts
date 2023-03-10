import { Message } from "@/interfaces";

export const saveMessages = (messages: Message[]) => {
  localStorage.setItem("messages", JSON.stringify(messages));
};

export const getMessages = () => {
  const localData = localStorage.getItem("messages");
  return localData ? JSON.parse(localData) : [];
};

export const clearMessages = () => {
  localStorage.removeItem("messages");
};
