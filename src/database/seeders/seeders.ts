import createDatabase from "@/database/index";
import { addSprintCodes, sprintCodes, sprintTitles } from "./addSprintCodes";
import { addMessages, messages } from "./addMessagesTemplate";
import dotenv from "dotenv";

dotenv.config();

const DATABASE = process.env.DATABASE_URL;

if (!DATABASE) {
  throw new Error("No DATABASE_URL provided in the environment variables");
}

const DB = createDatabase(DATABASE);

// add messages
addMessages(messages, DB).catch((error) =>
  console.error("Error inserting data:", error)
);

// add sprint codes and titles
addSprintCodes(sprintCodes, sprintTitles, DB).catch((error) =>
  console.error("Error inserting data:", error)
);
