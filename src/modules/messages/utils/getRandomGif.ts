import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();

const apiKey = process.env.GIPHY_API_KEY;

const giphyBaseUrl: string = "https://api.giphy.com/v1/gifs";
const searchEndpoint: string = "/search";
const limit: number = 1;
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

    // get random search term
    const searchTerm: string =
      searchTerms[Math.floor(Math.random() * searchTerms.length)];

    // get random offset
    const randomOffset = Math.floor(Math.random() * 50);

    // giphy url
    const url = `${giphyBaseUrl}${searchEndpoint}?api_key=${apiKey}&q=${searchTerm}&limit=${limit}&offset=${randomOffset}&rating=${rating}&lang=${lang}&bundle=${bundle}`;
    const response = await fetch(url);

    // gif data
    const gifData = await response.json();

    if (!gifData) {
      throw new Error("No data retrieved from Giphy API");
    }

    const gifUrl = gifData.data[0].url;
    return gifUrl;
  } catch (error) {
    console.error("Error fetching GIF URL", error);
    throw error;
  }
}
