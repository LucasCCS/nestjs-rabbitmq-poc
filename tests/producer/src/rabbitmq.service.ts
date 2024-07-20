import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, ClientsModule, Transport } from '@nestjs/microservices';
import { MessageBroker } from './message-broker.interface';
import { map, Observable } from 'rxjs';

@Injectable()
export class RabbitMQService implements MessageBroker {

  constructor(@Inject('RABBITMQ_SERVICE') private readonly client: ClientProxy) {}

  sendMessage(message: any) {
      this.client.emit('test', message);
    }

}
