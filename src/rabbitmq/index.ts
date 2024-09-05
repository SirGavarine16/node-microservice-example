import amqp from "amqplib/callback_api";

import { env } from "../configs/env";

export { default as EventProducer } from './EventProducer';

export const useRabbitMQ = () => {
  const { user, pass, host, port, exchange, keys } = env.rabbitmq;

  if (!user || !pass || !host || !port) {
    console.log("> No environment variables available to connect to RabbitMQ server...");
    return;
  }

  amqp.connect(`amqp://${user}:${pass}@${host}:${port}/`, (connectionError, connection) => {
    if (connectionError) {
      console.error("Connection Error at Consumer Function", connectionError);
      return;
    }

    connection.createChannel((channelError, channel) => {
      if (channelError) {
        console.error("Channel Error at Consumer Function", channelError);
        return;
      }

      channel.assertExchange(exchange, "direct", { durable: false });

      channel.assertQueue("", { exclusive: true }, (queueError, { queue }) => {
        if (queueError) {
          console.error("Queue Error at Consumer Function", queueError);
          return;
        }

        keys.forEach((routingKey) => {
          channel.bindQueue(queue, exchange, routingKey);
        });

        channel.consume(queue, (message) => {
          if (message) {
            const data = JSON.parse(message.content.toString());
            console.log("> Message received!", data);
          }
        }, {
          noAck: true,
        });
      });
    });
  });
}
