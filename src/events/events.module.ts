import { Module } from '@nestjs/common';
import { EventsService } from './events.service'
import { Orders } from 'src/entities/orders.entity';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';

@Module({
  imports: [NestjsQueryTypeOrmModule.forFeature([Orders])],
  providers: [EventsService],
})
export class EventsModule {}
