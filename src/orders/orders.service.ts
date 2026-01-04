import { Injectable } from '@nestjs/common';
import { IOrder } from './interfaces/orders.interface';
import mongoose, { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { OrderClass } from './schemas/orders.schema';
import ApiError from 'src/exceptions/errors/api-error';


@Injectable()
export class OrderService {
    constructor(
        @InjectModel('Order') private OrderModel: Model<OrderClass>,
    ) { }

    async create(order: IOrder) {
        if (typeof order == 'undefined' || Object.keys(order).length === 0) {
            throw ApiError.BadRequest("Пустое тело запроса!")
        }
        else if (typeof order?.customer == typeof mongoose.Types.ObjectId && order?.products?.length >= 1) {
            return this.OrderModel.create(order)
        }
        else {
            throw ApiError.BadRequest("Тело запроса содержит ошибки!")
        }
    }
    async delete(_id: mongoose.Types.ObjectId) {
        if (typeof _id == 'undefined') {
            throw ApiError.BadRequest("Пустое тело запроса!")
        }
        else {
            return this.OrderModel.deleteOne({ _id: _id })

        }
    }
    async edit(order: IOrder, _id: mongoose.Types.ObjectId) {
        if (typeof order == 'undefined' || Object.keys(order).length === 0 || typeof _id == 'undefined') {
            throw ApiError.BadRequest("Пустое тело запроса!")
        }
        else if (typeof order?.customer == typeof mongoose.Types.ObjectId && order?.products?.length >= 1 && typeof _id == typeof mongoose.Types.ObjectId) {
            return this.OrderModel.updateOne({ _id: _id },
                {
                    products: order.products,
                    customer: order.customer
                })
        }
        else {
            throw ApiError.BadRequest("Тело запроса содержит ошибки!")
        }
    }
}
