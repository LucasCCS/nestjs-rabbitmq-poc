// src/messaging/messaging.module.ts
import { Inject, Module, OnModuleInit } from '@nestjs/common';
import { RabbitMQService } from './rabbitmq.service';
import { AbstractMessagingService } from './abstract-messaging.service';

@Module({
    providers: [
      {
        provide: 'AbstractMessagingService',
        useClass: RabbitMQService,
      },
    ],
    exports: ['AbstractMessagingService'],
})

export class MessagingModule  implements OnModuleInit {
  constructor(@Inject('AbstractMessagingService') private readonly messagingService: AbstractMessagingService) {}
  onModuleInit() {
    this.messagingService.consume('my_queue', async (message) => {
      console.log(message);
    });
  }

}
