import express from "express";
import cors from "cors";

import { env } from "./configs/env";
import { EventProducer } from "./rabbitmq";
import { useGraphQL } from "./graphql/useGraphQL";

export const createApp = async () => {
  const app = express();

  app.use(express.json());
  app.use(cors());
  

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

  await useGraphQL(app);
  
  app.use("", (req, res) => {
    return res.status(404).json({
      message: `Endpoint ${req.path} with method ${req.method} was not found!`,
    });
  });

  return {
    app,
    port: env.port,
  };
}
