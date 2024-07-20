import { Inject, Module, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MessagingModule } from './messaging/messaging.module';
import { AbstractMessagingService } from './messaging/abstract-messaging.service';

@Module({
  controllers: [AppController],
  imports: [MessagingModule],
  providers: [
    AppService,
  ],
})
export class AppModule {}


