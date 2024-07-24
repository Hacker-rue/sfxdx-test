import { Injectable } from '@nestjs/common'
import { Orders } from '../entities/orders.entity'
import { InjectQueryService, QueryService } from '@nestjs-query/core'

@Injectable()
export class OrdersService {

  constructor(
    @InjectQueryService(Orders)
    private ordersService: QueryService<Orders>
  ) {}

  async getOrders(tokenA?: string, tokenB?: string, user?: string, active?: boolean) {
    let filter: any = {}

    if (tokenA) {
      filter.TokenA = { eq: tokenA }
    }

    if (tokenB) {
      filter.TokenB = { eq: tokenB }
    }

    if (user) {
      filter.UserAddres = { eq: user }
    }
    if(active) {
      filter.IsActive = { eq: true }
    }

    const orders = await this.ordersService.query({ filter })
    return orders
  }

  getMatchingOrders(): string {
    return ''
  }

}
