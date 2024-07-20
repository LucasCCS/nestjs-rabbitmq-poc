// src/messaging/rabbitmq.service.ts
import { Injectable, OnModuleInit } from '@nestjs/common';
import { connect, Connection, Channel } from 'amqplib';
import { AbstractMessagingService } from './abstract-messaging.service';

@Injectable()
export class RabbitMQService implements AbstractMessagingService, OnModuleInit {
  private connection: Connection;
  private channel: Channel;

  async onModuleInit() {
    await this.setup();
  }

  async setup(): Promise<void> {
    try {
      this.connection = await connect('amqp://localhost:5672');
      this.channel = await this.connection.createChannel();

      if (!this.channel) {
        throw new Error('Failed to create channel');
      }

      // Defina a exchange
      await this.channel.assertExchange('my_exchange', 'topic', { durable: false });

      // Defina uma fila e faça o binding
      const queue = 'my_queue';
      await this.channel.assertQueue(queue, { durable: false });
      await this.channel.bindQueue(queue, 'my_exchange', 'routing_key.*.TEST');
    } catch (error) {
      console.error('Error setting up RabbitMQ:', error);
      throw error;
    }
  }

  async publish(queue: string, message: any): Promise<void> {
    // envia diretamente para uma fila
    // this.channel.sendToQueue(queueOrTopic, Buffer.from(JSON.stringify(message)));

    this.channel.publish('my_exchange', 'routing_key.EMAIL.TEST', Buffer.from(JSON.stringify(message)));
    this.channel.publish('my_exchange', 'routing_key.TEST', Buffer.from(JSON.stringify(message)));

  }

  consume(queue: string, handler: (message: any) => Promise<void>): void {
    this.channel.consume(queue, async (msg) => {
      if (msg) {
        const content = msg.content.toString();
        const parsedMessage = JSON.parse(content);

        await handler(parsedMessage);

        // this.channel.nack(msg);

        this.channel.ack(msg);
      }
    });
  }
}
