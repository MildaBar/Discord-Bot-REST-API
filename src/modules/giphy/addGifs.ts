import { Router, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();

const router = Router();
const apiKey = process.env.GIPHY_API_KEY;
const giphyApi = process.env.GIF_API_KEY;

console.log("API Key:", apiKey);
console.log("Giphy API:", giphyApi);

router.get("/random-gif", async (req: Request, res: Response) => {
  try {
    if (!apiKey) {
      throw new Error("Provide GIPHY API in your environment variables");
    }
    const response = await fetch(giphyApi);
    const data = await response.json();

    if (!data || !data.data || !data.data.length) {
      throw new Error("No data retrieved from Giphy API");
    }

    const gifUrl = data.data[0].images.original.url;
    res.json({ gifUrl });
  } catch (error) {
    return res
      .status(500)
      .json({ error: error.message || "Error getting movie." });
  }
});

export default router;
