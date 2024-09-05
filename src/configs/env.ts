import dotenv from "dotenv";

dotenv.config();

export const env = {
  port: process.env.PORT || "3000",
  rabbitmq: {
    host: process.env.RABBITMQ_HOST,
    port: process.env.RABBITMQ_PORT,
    user: process.env.RABBITMQ_USER,
    pass: process.env.RABBITMQ_PASS,
    exchange: process.env.RABBITMQ_EXCHANGE || "",
    keys: (process.env.RABBITMQ_KEYS || "").split(","),
  },
};
