import { Observable } from "rxjs";

export interface MessageBroker {
    sendMessage(message: any);
    // handleMessage(topic: string, callback: (message: any) => void): void;
}