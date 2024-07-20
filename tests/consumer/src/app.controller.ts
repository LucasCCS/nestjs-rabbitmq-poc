import { Controller, Get, Inject } from '@nestjs/common';
import { Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { AbstractMessagingService } from './messaging/abstract-messaging.service';

@Controller()
export class AppController {

  constructor(@Inject('AbstractMessagingService') private readonly messagingService: AbstractMessagingService) {}

  @Get()
  send() {
    this.messagingService.publish('my_queue', {  message: 'ok' });
    return 'ok';
  }


  // @MessagePattern('send-mail')
  // public async execute(@Payload() data: any, @Ctx() context: RmqContext) {
  //   const channel = context.getChannelRef();
  //   const orginalMessage = context.getMessage();

  //   console.log(data);

  //   channel.ack(orginalMessage);
  // }

  
  // @MessagePattern('')
  // getNotifications(@Payload() data: any, @Ctx() context: RmqContext) {
  //   try {
  //     console.log('data: ', data);
 
  //     const channel = context.getChannelRef();
  //     const originalMsg = context.getMessage();
 
  //     channel.ack(originalMsg);
  //     return data;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
}
