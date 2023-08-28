import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();

const API_KEY = process.env.FRESHDESK_API_KEY;

const API_ENDPOINT = "https://semarchysupport.freshdesk.com/api/v2/tickets/";

const headers = {
  "Content-Type": "application/json",
  Authorization: "Basic " + Buffer.from(`${API_KEY}:`).toString("base64"),
};
const headersé = {
  "Content-Type": "application/json",
  Authorization: "Basic " + Buffer.from(`${API_KEY}:`).toString("base64"),
};

export const getTicketDescription = async (ticketId) => {
  const url = `${API_ENDPOINT}${ticketId}`;

  try {
    const response = await fetch(url, { headers });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    return data.description_text;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getTicketConversations = async (ticketId) => {
  const url = `${API_ENDPOINT}${ticketId}/conversations`;

  try {
    const response = await fetch(url, { headers });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error: ${response.status} - ${errorText}`);
    }

    const conversations = await response.json();
    let conversation = "";
    conversations.forEach((conv) => {
      conversation += conv.body_text;
    });

    return conversation;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const articleCreation = async (title, description, folderId) => {
  const SOLUTIONS_ENDPOINT = `https://semarchysupport.freshdesk.com/api/v2/solutions/folders/${folderId}/articles`;

  const articleData = {
    title: title,
    description: description,
    status: 1,
  };

  try {
    const response = await fetch(SOLUTIONS_ENDPOINT, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(articleData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
