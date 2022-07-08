/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class CreateOrderDto {
  @IsPositive()
  @IsNumber()
  @IsNotEmpty()
  amount: number;
}
