// import createTestDatabase from "@tests/utils/createTestDatabase";
import createTestDatabase from "../../../../tests/utils/createTestDatabase";
import { selectAllFor } from "../../../../tests/utils/records";
import buildRepository from "../repository";

const db = await createTestDatabase();
const username = "johdoe";
const repository = buildRepository(db, username);
const selectUserData = selectAllFor(db, "users");

afterAll(async () => await db.destroy());

afterEach(async () => {
  await db.deleteFrom("users").execute();
});

describe("create", () => {
  it("should add new users data", async () => {
    const user = await repository.create({
      username: "johdoe",
    });

    expect(user).toEqual({
      id: expect.any(Number),
      username: "johdoe",
    });

    const userInDatabase = await selectUserData();
    expect(userInDatabase).toEqual([user]);
  });
});
