import createTestDatabase from "../../../../tests/utils/createTestDatabase";
import { selectAllFor } from "../../../../tests/utils/records";
import buildRepository from "../repository";

const db = await createTestDatabase();
const gifUrl = "test url";
const repository = buildRepository(db, gifUrl);
const selectGifData = selectAllFor(db, "gifs");

afterAll(async () => await db.destroy());

afterEach(async () => {
  await db.deleteFrom("gifs").execute();
});

describe("create", () => {
  it("should add new gif url data", async () => {
    const gifs = await repository.create({
      gifUrl: "test url",
    });

    expect(gifs).toEqual({
      id: expect.any(Number),
      gifUrl: "test url",
    });

    const gifInDatabase = await selectGifData();
    expect(gifInDatabase).toEqual([gifs]);
  });
});
