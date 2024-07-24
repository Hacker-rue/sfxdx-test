import { Controller, Get, Query, Res } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { query, Response } from 'express';
import { BoolPipe } from './BoolPipe';

@Controller('orders')
export class OrdersController {
  constructor(private readonly OrderService: OrdersService) {}

  @Get('getOrders')
  async getOrders(@Res() res: Response,
  @Query('tokenA') tokenA?: string,
  @Query('tokenB') tokenB?: string,
  @Query('user') user?: string,
  @Query('active', BoolPipe) active: boolean = false) {
    return res.status(200).send(await this.OrderService.getOrders(tokenA, tokenB, user, active))
  }

  @Get('getMatchingOrders')
  getMatchingOrders(@Query() query, @Res() res: Response): Object {
    return res.status(200).send(query)
  }
}
