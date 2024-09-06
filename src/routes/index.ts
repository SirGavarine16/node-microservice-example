import express from "express";
import type { Express  } from "express";

import { EventProducer } from "../rabbitmq";
import exampleRouter from "./example";

export const useAPIRouting = (app: Express) => {
  const baseRouter = express.Router();

  app.get("/health", (_, res) => {
    return res.status(200).json({
      message: "Service is up and running!",
    });
  });

  app.post("/broker", (req, res) => {
    const { event, payload, key } = req.body;

    new EventProducer().execute({ event, payload }, key);

    return res.status(201).json({
      message: "Event was sent successfully!",
    });
  });

  app.use("/api/v1", baseRouter);

  baseRouter.use("/example", exampleRouter);

  app.use("", (req, res) => {
    return res.status(404).json({
      message: `Endpoint ${req.path} with method ${req.method} was not found!`,
    });
  });
}