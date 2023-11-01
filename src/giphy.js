import { GiphyFetch } from "@giphy/js-fetch-api";
import "dotenv";

const gf = new GiphyFetch(process.env.API_KEY);

const { data: gifs } = await gf.trending({ limit: 10 });
