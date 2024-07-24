import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrdersModule } from './orders/orders.module'
import { TypeOrmModule } from '@nestjs/typeorm';
import ormconfig = require('../ormconfig')
import { EventsModule } from './events/events.module';

@Module({
  imports: [OrdersModule, EventsModule, TypeOrmModule.forRoot(ormconfig)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
