import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { RabbitMQService } from './rabbitmq.service';

@Controller()
export class AppController {
  constructor(private readonly appService: RabbitMQService) { }

  @Get('create-order')
  createOrder(): string {
    this.appService.publish('order.created', {
      message: 'Novo pedido recebido!'
    });
    return 'Order Created';
  }

  @Get('cancel-order')
  cancelOrder(): string {
    this.appService.publish('order.cancel', {
      message: 'Pedido cancelado!'
    });
    return 'Order Cancel';
  }
}
