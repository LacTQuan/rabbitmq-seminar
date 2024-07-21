import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MessageModule } from './message/message.module';
import { ListenerModule } from './listener/listener.module';

@Module({
  imports: [MessageModule, ListenerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
