import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { Orders } from '../entities/orders.entity'

@Module({
  imports: [NestjsQueryTypeOrmModule.forFeature([Orders])],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
