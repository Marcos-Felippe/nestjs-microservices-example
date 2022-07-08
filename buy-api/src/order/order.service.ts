/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
//import { InjectModel } from '@nestjs/sequelize';
import { CreateOrderDto } from './dto/create-order.dto';
//import { UpdateOrderDto } from './dto/update-order.dto';
//import { Order } from './entities/order.entity';

@Injectable()
export class OrdersService {
  constructor(
    //@InjectModel(Order)
    //private orderModel: typeof Order,
  ) {
    //
  }
}