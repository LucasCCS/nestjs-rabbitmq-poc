import { Injectable, Module, OnModuleInit } from '@nestjs/common';
import { Connection, Channel, connect } from 'amqplib';

@Injectable()
export class RabbitMQService implements OnModuleInit {
    
    private connection: Connection;
    private channel: Channel;
    private exchange = 'orders.events';

    async onModuleInit() {
        this.connection = await connect('amqp://localhost:5672');
        this.channel = await this.connection.createChannel();

        this.channel.assertExchange(this.exchange, 'topic', { durable: false });
    }

    async publish(routing_key: string, message: any) {
        this.channel.publish(this.exchange, routing_key, Buffer.from(JSON.stringify(message)));
    }
    
}
