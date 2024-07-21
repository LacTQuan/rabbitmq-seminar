import { Body, Controller, Post } from '@nestjs/common';
import { MessageService } from './message.service';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post('send')
  sendMessage(@Body() body: { message: string }) {
    return this.messageService.sendMessage(body.message);
  }
}
