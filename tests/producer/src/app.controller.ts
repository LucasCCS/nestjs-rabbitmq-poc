import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { MessageBroker } from './message-broker.interface';
import { ClientProxy } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, 
    @Inject('RABBITMQ_SERVICE') private readonly client: ClientProxy) {}

  @Get()
  // async getHello() {
    
  //   const message = { text: 'Hello, World!' };
  //   await this.client.send('', message).toPromise(); // Padrão 'test'
  //   return 'Message sent';

  // }
  async getHello() {
    
    const message = { text: 'Hello, World!' };
    this.client.send('', message).toPromise(); // Padrão 'test'
    return 'Message sent';

  }
}
