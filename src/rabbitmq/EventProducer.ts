import amqp from "amqplib/callback_api";

import { env } from "../configs/env";

const { host, port, user, pass, exchange } = env.rabbitmq;

type EventAction<T> = {
  event: string;
  payload: T;
};

class EventProducer {
  private rabbit: typeof amqp;
  private connectionString: string;

  constructor() {
    this.rabbit = amqp;
    this.connectionString = `amqp://${user}:${pass}@${host}:${port}/`;
  }

  execute<T>(data: EventAction<T>, routingKey: string) {
    this.rabbit.connect(
      this.connectionString,
      (connectionError, connection) => {
        if (connectionError) {
          console.error("Connection Error at EventProducer", connectionError);
          return;
        }

        connection.createChannel((channelError, channel) => {
          if (channelError) {
            console.error("Channel Error at EventProducer", channelError);
            return;
          }

          channel.assertExchange(exchange, "direct", { durable: false });

          const content = JSON.stringify(data);

          channel.publish(exchange, routingKey, Buffer.from(content));
        });

        setTimeout(() => {
          connection.close();
        }, 500);
      }
    );
  }
}

export default EventProducer;
