import supertest from "supertest";
import createApp from "@/app";
import createTestDatabase from "@tests/utils/createTestDatabase";
import { fail } from "assert";

const db = await createTestDatabase();
const app = createApp(db);

describe("getGifUrl", () => {
  it("should fetch GIF url from GIPHY", async () => {
    try {
      const response = await supertest(app).get("/random-gif").expect(200);
      const { body } = response;
      expect(body.gifUrls[0]).toMatch(/^https?:\/\/(?:.*\.)?giphy\.com\/.*$/);
    } catch (error) {
      if (error instanceof Error) {
        fail(error.message);
      } else {
        throw new Error("Error occurred while fetching GIF url.");
      }
    }
  });
});
