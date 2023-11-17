import createTestDatabase from "@tests/utils/createTestDatabase";
import { createFor } from "@tests/utils/records";
import { usersFactory } from "../../../users/tests/utils";
import getUsersId from "../getUsersId";

const db = await createTestDatabase();
const createUsersRecord = createFor(db, "users");

afterAll(() => db.destroy());

afterEach(async () => {
  await db.deleteFrom("users").execute();
});

describe("getUsersId", () => {
  it("should return users ID based on username", async () => {
    await createUsersRecord([
      usersFactory({
        id: 1,
        username: "johnjoe",
      }),
    ]);

    const username = "johnjoe";
    const userId = await getUsersId(db, username);

    expect(userId).toEqual(1);
  });
});
