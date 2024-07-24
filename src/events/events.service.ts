require('dotenv').config();
import { Injectable, OnModuleInit } from '@nestjs/common';
import { ethers } from 'ethers'
import { Orders } from '../entities/orders.entity'
import {contractABI} from './orders.contract.abi.js'
import { InjectQueryService, QueryService } from '@nestjs-query/core';
import { Query } from 'typeorm/driver/Query';

@Injectable()
export class EventsService implements OnModuleInit {
  
  constructor(
    @InjectQueryService(Orders)
    private ordersService: QueryService<Orders>
  ) {}

  async onModuleInit() {
    console.log(process.env.INFURA_URL)
    const provider = new ethers.JsonRpcProvider(process.env.INFURA_URL)
    const contract = new ethers.Contract(process.env.CONTRACT_ADDRESS, contractABI, provider)

    await this.fetchAllEventsSinceDeployment(contract)
    contract.on('OrderCreated', this.orderCreated)
  }

  private async orderCreated(...args) {
    console.log()
  }

  private async fetchAllEventsSinceDeployment(contract: ethers.Contract) {
    try {
    
      // Получаем все события контракта с момента деплоя до текущего момента
      const eventsCreateOrders = await contract.queryFilter("OrderCreated", Number(process.env.DEPLOYMENT_BLOCK_CONTRACT), "latest");
      
      for (const event of eventsCreateOrders) {
        const decodedEvent = contract.interface.decodeEventLog("OrderCreated", event.data, event.topics);
        await this.addCreateOrder(decodedEvent)
      }

      const eventsOrderMatched = await contract.queryFilter("OrderMatched", Number(process.env.DEPLOYMENT_BLOCK_CONTRACT), "latest")

      for (const event of eventsOrderMatched) {
        const decodedEvent = contract.interface.decodeEventLog("OrderMatched", event.data, event.topics);
        await this.updateOrdersMatched(decodedEvent)
      }

      const eventsOrderCancelled = await contract.queryFilter("OrderCancelled", Number(process.env.DEPLOYMENT_BLOCK_CONTRACT), "latest")
      for (const event of eventsOrderCancelled) {
        const decodedEvent = contract.interface.decodeEventLog("OrderCancelled", event.data, event.topics);
        console.log("teste23")
        console.log(decodedEvent)
        await this.updateOrderCancelled(decodedEvent)
      }
    } catch (error) {
      console.error('Ошибка при получении прошлого события:', error);
    }
  }

  private async addCreateOrder(event) {
    try {
      const orders = await this.ordersService.query({
        filter: {OrdersId: {eq: event[0]}}
      })
      if(orders[0] === undefined) {
        this.ordersService.createOne({
          OrdersId: event[0],
          AmountA: event[1],
          AmountB: event[2],
          TokenA: event[3],
          TokenB: event[4],
          UserAddres: event[5],
          IsActive: true
        })
      }
    } catch {
      this.ordersService.createOne({
        OrdersId: event[0],
        AmountA: event[1],
        AmountB: event[2],
        TokenA: event[3],
        TokenB: event[4],
        UserAddres: event[5],
        IsActive: true
      })
    }
  }

  private async updateOrdersMatched(event) {
    try {
      const orders = await this.ordersService.query({
        filter: {OrdersId: {eq: event[0]}}
      })
      console.log(event)
      console.log("не понятный ордер: ")
      console.log(orders[0])
      if(orders[0].AmountA == event[4]) {
        await this.ordersService.updateOne(orders[0].Id, {
          IsActive: false
        })
      }
    } catch(error) {
      console.log(error)
    }
  }

  private async updateOrderCancelled(event) {
    try {
      const orders = await this.ordersService.query({
        filter: {OrdersId: {eq: event[0]}}
      })

      if(orders[0].IsActive) {
        await this.ordersService.updateOne(orders[0].Id, {
          IsActive: false
        })
      }
    } catch(error) {
      console.log(error)
    }
  }

}
