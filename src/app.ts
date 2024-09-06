import express from "express";
import cors from "cors";

import { env } from "./configs/env";
import { useAPIRouting } from "./routes";
import { useGraphQL } from "./graphql/useGraphQL";

export const createApp = async () => {
  const app = express();

  app.use(express.json());
  app.use(cors());
  
  useAPIRouting(app);

  await useGraphQL(app);

  return {
    app,
    port: env.port,
  };
}
