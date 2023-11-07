import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();

const apiKey = process.env.GIPHY_API_KEY;

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

export default async function extractGifUrl() {
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

    const gifUrl = data.data[0].url;
    return gifUrl;
  } catch (error) {
    console.error("Error fetching GIF URL", error);
    throw error;
  }
}

async function getGif() {
  try {
    const gifUrl = await extractGifUrl();
    return gifUrl;
  } catch (error) {
    console.error("Error:", error);
  }
}

const gif = getGif();