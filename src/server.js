import bodyParser from "body-parser";
import dotenv from "dotenv";
import express from "express";
import {
  articleCreation,
  getTicketConversations,
  getTicketDescription,
} from "./api/freshdesk.js";
import { generateArticleFromTicket } from "./api/openai.js";
import ARTICLE_MESSAGES from "./utilities.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.get("/generate-article", async (req, res) => {
  try {
    const ticketId = req.query.ticketId;
    const createArticle = req.query.createArticle === "true";

    if (!ticketId) {
      res.status(400).json({ error: "Ticket ID is required" });
      return;
    }

    const description = await getTicketDescription(ticketId);
    const conversations = await getTicketConversations(ticketId);
    const fullMessage = description + conversations;

    let articleDescription = await generateArticleFromTicket(
      fullMessage,
      ARTICLE_MESSAGES
    );

    if (createArticle) {
      const folderId = "43000591618"; // Change it if needed / It corresponds to xDI - Internal Only > Articles drafts

      const article = await articleCreation(
        `Artcile from ticket ${ticketId}`,
        articleDescription,
        folderId
      );

      res.status(200).json({ article });
    } else {
      res.status(200).json({ articleDescription });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
