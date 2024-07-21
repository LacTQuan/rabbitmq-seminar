import { Injectable, Logger } from '@nestjs/common';
import {
  Client,
  ClientProxy,
  MessagePattern,
  Transport,
} from '@nestjs/microservices';

@Injectable()
export class ListenerService {
  private readonly logger = new Logger(ListenerService.name);

  @Client({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'],
      queue: 'message_queue',
      queueOptions: {
        durable: false,
      },
    },
  })
  private client: ClientProxy;

  onModuleInit() {
    this.client.connect().then(() => {
      this.logger.log('Listener connected');
    });
  }

  @MessagePattern('message_queue')
  handleMessage(message: string) {
    this.logger.log(`Received message: ${message}`);
  }
}
