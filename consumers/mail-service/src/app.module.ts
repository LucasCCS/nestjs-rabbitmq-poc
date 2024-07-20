import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RabbitMQService } from './rabbitmq.service';
import { MailerModule } from '@nestjs-modules/mailer';
import * as nodemailer from 'nodemailer';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: 'smtp://localhost:1025',
      defaults: {
        from: '"nest-modules" <modules@nestjs.com>',
      }
    }),
  ],
  controllers: [AppController],
  providers: [AppService, RabbitMQService],
})
export class AppModule {}
