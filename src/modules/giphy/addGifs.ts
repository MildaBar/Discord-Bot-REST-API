import { Router, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();

const router = Router();
const apiKey = process.env.GIPHY_API_KEY;
const giphyApi: string = process.env.GIF_API_KEY || "";

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
