import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { OrderService } from './orders.service';
import { IOrder } from './interfaces/orders.interface';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { OrderClass } from './schemas/orders.schema';

@Controller('orders')
export class OrderController {

    constructor(
        private readonly orderService: OrderService,
        @InjectModel('Order') private OrderModel: Model<OrderClass>,
    ) { }

    @HttpCode(HttpStatus.CREATED)
    @Post('create')
    async create(
        @Body('order') order: IOrder) {
        return this.orderService.create(order)
    }

    @HttpCode(HttpStatus.OK)
    @Post('delete')
    async delete(
        @Body('_id') _id: mongoose.Types.ObjectId) {
        return this.orderService.delete(_id)
    }

    @HttpCode(HttpStatus.OK)
    @Post('edit')
    async edit(
        @Body('order') order: IOrder,
        @Body('_id') _id: mongoose.Types.ObjectId) {
        return this.orderService.edit(order, _id)
    }
}