import { useRabbitMQ } from "./rabbitmq";
import { createApp } from "./app"

const runService = async () => {
  useRabbitMQ();

  const { app, port } = await createApp();

  app.listen(port, () => {
    console.log(`> Service is up and running on port ${port}...`);
  }); 
}

runService();