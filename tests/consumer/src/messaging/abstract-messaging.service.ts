// src/messaging/abstract-messaging.service.ts
export interface AbstractMessagingService {
    setup(): Promise<void>;
    publish(queue: string, message: any): Promise<void>;
    consume(queue: string, handler: (message: any) => Promise<void>): void;
  }
  