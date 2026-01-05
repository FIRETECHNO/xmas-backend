import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { OrderService } from './order.service';
import { IOrder } from './interfaces/order.interface';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { OrderClass } from './schemas/order.schema';
import ApiError from 'src/exceptions/errors/api-error';

@Controller('order')
export class OrderController {

    constructor(
        private readonly orderService: OrderService,
        @InjectModel('Order') private OrderModel: Model<OrderClass>,
    ) { }

    @HttpCode(HttpStatus.CREATED)
    @Post('create')
    async create(
        @Body('products') products: mongoose.Types.ObjectId[],
        @Body('customer') customer: mongoose.Types.ObjectId) {
        try {
            return this.orderService.create({ products, customer })
        } catch (error) {
            ApiError.BadRequest("Тело запроса содержит ошибки")
        }
    }

    @HttpCode(HttpStatus.OK)
    @Post('delete')
    async delete(
        @Body('_id') _id: mongoose.Types.ObjectId) {
        try {
            return this.orderService.delete(_id)
        } catch (error) {
            ApiError.BadRequest("Тело запроса содержит ошибки")
        }
    }

    @HttpCode(HttpStatus.OK)
    @Post('edit')
    async edit(
        @Body('products') products: mongoose.Types.ObjectId[],
        @Body('customer') customer: mongoose.Types.ObjectId,
        @Body('_id') _id: mongoose.Types.ObjectId) {

        try {
            return this.orderService.edit({ products, customer }, _id)
        } catch (error) {
            ApiError.BadRequest("Тело запроса содержит ошибки")
        }
    }
}