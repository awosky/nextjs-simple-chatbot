import { Message } from "@/interfaces";

export const getResponse = async (messages: Message[]) => {
  try {
    const prompt = messages.map((m) => `${m.role}: ${m.content}`).join("\n");

    const response = await fetch("/api/geminiAI/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });

    const data = await response.json();

    if (response.status !== 200) {
      throw new Error(
        data.error || `Request failed with status ${response.status}`
      );
    }
    return data.text;
  } catch (error) {
    console.error(error);
  }
};
