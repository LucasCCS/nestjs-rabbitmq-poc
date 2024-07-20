import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { AbstractMessagingService } from './messaging/abstract-messaging.service';
import { Ctx, EventPattern, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';

@Injectable()
export class AppService  {
  // implements OnModuleInit
  // constructor(@Inject('AbstractMessagingService') private readonly messagingService: AbstractMessagingService) {}
  // onModuleInit() {
  //   this.messagingService.consumeMessages('my_queue', async (message) => {
  //     console.log(message);
  //   })
  // }

  
}
