/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Inject } from '@nestjs/common';

import { OrdersService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
//import { UpdateOrderDto } from './dto/update-order.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { KafkaMessage } from '@nestjs/microservices/external/kafka.interface';
import { Producer } from 'kafkajs';

@Controller('orders')
export class OrdersController {
  constructor(
    private readonly ordersService: OrdersService,
    @Inject('KAFKA_PRODUCER')
    private kafkaProducer: Producer,
  ) {}

  @Get()
  findAll() {
    return 'ok';
  }

  @MessagePattern('topic-payments')
  consumer(@Payload() message: KafkaMessage) {
    console.log(message.value);
  }

  @Post('producer')
  async producer(@Body() body) {
    await this.kafkaProducer.send({
      topic: 'topic-orders',
      messages: [{ key: 'orders', value: JSON.stringify(body) }],
    });
    return 'Mensagem publicada';
  }
}
// orders/producer
//DELETE 400 e 500 - Sucesso

// {success: false}
