import createApp from "@/app";
import createTestDatabase from "@tests/utils/createTestDatabase";
import getRandomGif from "../getRandomGif";
import { fail } from "assert";

const db = await createTestDatabase();
const app = createApp(db);

afterAll(() => db.destroy());

describe("getRandomGif", () => {
  it("should return a valid GIF URL", async () => {
    try {
      const gifUrl = await getRandomGif();
      expect(gifUrl).toMatch(/^https?:\/\/(?:.*\.)?giphy\.com\/.*$/);
    } catch (error) {
      if (error instanceof Error) {
        fail(error.message);
      } else {
        throw new Error("Error occurred while fetching GIF url");
      }
    }
  });
});

/*
EXPLANATION:
/^https?:\/\/(?:.*\.)?giphy\.com\/.*$/

^ - the start of the string
https? match either "http" or "https" ("?" makes the "s" optional)
:\/\/ - matches "://"
(?:.*\.)? - checks for an optional subdomain, such as "www." (in "www.giphy.com")
giphy\.com - match literal string "giphy.com"
\/.* - check the part that comes after "https://giphy.com/gifs/""
$ - end of the string
*/
