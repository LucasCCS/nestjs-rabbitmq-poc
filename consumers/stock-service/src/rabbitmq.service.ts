import { Injectable, OnModuleInit } from "@nestjs/common";
import { Channel, Connection, connect } from "amqplib";

@Injectable()
export class RabbitMQService implements OnModuleInit {

    private connection: Connection;
    private channel: Channel;
    private exchange = 'orders.events';
    private queue = 'stock-queue';

    async onModuleInit() {
        this.connection = await connect('amqp://localhost:5672');
        this.channel = await this.connection.createChannel();

        this.channel.assertExchange(this.exchange, 'topic', { durable: false });

        this.channel.assertQueue(this.queue, { durable: false });
        this.channel.bindQueue(this.queue, this.exchange, 'order.created');

        this.channel.consume(this.queue, async (msg) => {
            if (msg) {
                const content = msg.content.toString();
                const parsedMessage = JSON.parse(content);
        
                console.log(parsedMessage);
        
                this.channel.ack(msg);
              }
        })
    }
    
}