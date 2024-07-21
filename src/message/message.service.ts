import { Injectable, Logger } from '@nestjs/common';
import { Client, ClientProxy, Transport } from '@nestjs/microservices';

@Injectable()
export class MessageService {
  private readonly logger = new Logger(MessageService.name);

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

  async sendMessage(message: string) {
    this.logger.log(`Sending message: ${message}`);
    await this.client.send<string>('message_queue', message).toPromise();
    this.logger.log('Message sent');
  }
}
