// enables us to create the server
import express from "express";
import { type Database } from "./database";
import getGifs from "./modules/giphy/addGifs";
import messageTemplates from "./modules/messages/controller";

export default function createApp(db: Database) {
  // initialize teh express application
  const app = express();

  // middleware
  app.use(express.json());

  // app.use("/random-gif", getGifs);

  app.use("/", messageTemplates(db));

  return app;
}
