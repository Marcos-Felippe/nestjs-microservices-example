/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Inject } from '@nestjs/common';

import { PaymentService } from './payment.service';
//import { CreateOrderDto } from './dto/create-payment.dto';
//import { UpdateOrderDto } from './dto/update-order.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { KafkaMessage } from '@nestjs/microservices/external/kafka.interface';
import { Producer } from 'kafkajs';

@Controller('orders')
export class PaymentController {
  constructor(
    private readonly ordersService: PaymentService,
    @Inject('KAFKA_PRODUCER')
    private kafkaProducer: Producer,
  ) {}

  @Get()
  findAll() {
    return 'ok';
  }

  @MessagePattern('topic-orders')
  async consumer(@Payload() message: KafkaMessage) {
    console.log(message.value);
    console.log('-----------');
    const payment = {
      id: 'wrgwg',
      status: 'efetuado'
    }
    await this.kafkaProducer.send({
      topic: 'topic-payments',
      messages: [{ key: 'payments', value: JSON.stringify(payment) }],
    });
    return 'Mensagem publicada';
  }
}