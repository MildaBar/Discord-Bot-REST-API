import { Router, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();

const router = Router();
const apiKey = process.env.GIPHY_API_KEY;

// giphy data
const giphyBaseUrl: string = "https://api.giphy.com/v1/gifs";
const searchEndpoint: string = "/search";
const limit: number = 1;
const offset: number = 0;
const rating: string = "g";
const lang: string = "en";
const bundle: string = "messaging_non_clips";
const searchTerms: string[] = [
  "congratulations",
  "well done",
  "great job",
  "celebration",
];

// get one random gif url
router.get("/", async (req: Request, res: Response) => {
  try {
    if (!apiKey) {
      throw new Error("Provide GIPHY API key in your environment variables");
    }

    // get different gif with random search term
    const searchTerm: string =
      searchTerms[Math.floor(Math.random() * searchTerms.length)];

    // giphy url
    const response = await fetch(
      `${giphyBaseUrl}${searchEndpoint}?api_key=${apiKey}&q=${searchTerm}&limit=${limit}&offset=${offset}&rating=${rating}&lang=${lang}&bundle=${bundle}`
    );

    // gif data
    const data = await response.json();

    if (!data || !data.data || data.data.length === 0) {
      throw new Error("No data retrieved from Giphy API");
    }

    const gifUrls = data.data.map((gif: any) => gif.url);
    res.json({ gifUrls });
  } catch (error) {
    if (error instanceof Error) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: error.message });
    } else {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: "An unknown error occurred." });
    }
  }
});

export default router;
