// enables us to create the server
import express from "express";

export default function createApp() {
  // initialize teh express application
  const app = express();

  // middleware
  app.use(express.json());

  return app;
}
