import createTestDatabase from "@tests/utils/createTestDatabase";
import { createFor } from "@tests/utils/records";
import { gifFactory } from "../../../gifs/tests/utils";
import getGifId from "../getGifId";

const db = await createTestDatabase();
const createGifsRecord = createFor(db, "gifs");

afterAll(() => db.destroy());

afterEach(async () => {
  await db.deleteFrom("gifs").execute();
});

describe("getGifId", () => {
  it("should return GIFs id based on GIF url", async () => {
    await createGifsRecord([
      gifFactory({
        id: 1,
        gifUrl: "test url",
      }),
    ]);

    const gifUrl = "test url";
    const gifId = await getGifId(db, gifUrl);

    expect(gifId).toEqual(1);
  });
});
