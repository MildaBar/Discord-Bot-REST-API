// enables us to create the server
import express from "express";
import { type Database } from "./database";
import getGifs from "./modules/giphy/getGifUrl";

// messages
import getMessageTemplates from "@/modules/messages/controller/get";
import postMessageTemplates from "@/modules/messages/controller/post";

// templates
import getTemplates from "./modules/templates/controller/get";
import deleteTemplates from "./modules/templates/controller/delete";
import patchTemplates from "./modules/templates/controller/patch";
import postTemplates from "./modules/templates/controller/post";

// sprints
import getSprints from "./modules/sprints/controller/get";
import deleteSprints from "./modules/sprints/controller/delete";
import patchSprints from "./modules/sprints/controller/patch";
import postSprints from "./modules/sprints/controller/post";

export default function createApp(db: Database) {
  // initialize the express application
  const app = express();

  // middleware
  app.use(express.json());

  app.use("/random-gif", getGifs);

  /* /messages */
  app.use("/messages", getMessageTemplates(db));
  app.use("/messages", postMessageTemplates(db));

  /* /templates */
  app.use("/templates", getTemplates(db));
  app.use("/templates", deleteTemplates(db));
  app.use("/templates", patchTemplates(db));
  app.use("/templates", postTemplates(db));

  /* /sprints */
  app.use("/sprints", getSprints(db));
  app.use("/sprints", deleteSprints(db));
  app.use("/sprints", patchSprints(db));
  app.use("/sprints", postSprints(db));

  return app;
}
