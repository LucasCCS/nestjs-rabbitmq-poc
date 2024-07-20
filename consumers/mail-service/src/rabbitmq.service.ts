import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, Module, OnModuleInit } from '@nestjs/common';
import { Connection, Channel, connect } from 'amqplib';

@Injectable()
export class RabbitMQService implements OnModuleInit {
    
    private connection: Connection;
    private channel: Channel;
    private exchange = 'orders.events';
    private queue = 'send-mail-queue';

    constructor(private readonly mailerService: MailerService) {}

    async onModuleInit() {
        this.connection = await connect('amqp://localhost:5672');
        this.channel = await this.connection.createChannel();

        this.channel.assertExchange(this.exchange, 'topic', { durable: false });

        await this.channel.assertQueue(this.queue, { durable: false });
        // Bind realizado em todos os eventos/routing_key que comecem com order.*: order.created, order.cancel
        await this.channel.bindQueue(this.queue, this.exchange, 'order.*');

        this.channel.consume(this.queue, async (msg) => {
            if (msg) {
              try {
                const content = msg.content.toString();
                const parsedMessage = JSON.parse(content);
        
                await this.mailerService.sendMail({
                    to: 'test@test.com.br',
                    subject: parsedMessage.message,
                    html: parsedMessage.message
                });
                
                console.log(parsedMessage);
        
                this.channel.ack(msg);
              } catch {
                this.channel.nack(msg);
              }
            }
        });
    }
}
