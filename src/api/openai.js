import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();

const OPENAI_ENDPOINT = "https://api.openai.com/v1/chat/completions";
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${OPENAI_API_KEY}`,
};

const createChatCompletion = async (messages) => {
  const data = {
    model: "gpt-4",
    messages: messages,
    temperature: 1,
    max_tokens: 4095,
  };

  try {
    const response = await fetch(OPENAI_ENDPOINT, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error: ${response.status} - ${errorText}`);
    }

    const result = await response.json();
    return result.choices[0].message.content.replace(/\r?\n/g, "");
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const generateArticleFromTicket = async (fullMessage, messageType) => {
  const systemMessages = [
    {
      role: "system",
      content: "You are a support engineer specialised in data management.",
    },
    { role: "system", content: "Always use english to write answers." },
    {
      role: "system",
      content:
        "You will be provided with a full discussion between a support engineer and a customer.",
    },
    {
      role: "system",
      content: "Never Write any name or surname in the answer.",
    },
  ];

  const messages = [
    ...systemMessages,
    ...messageType,
    { role: "user", content: fullMessage },
  ];
  return createChatCompletion(messages);
};
