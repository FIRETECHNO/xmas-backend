import { Injectable } from '@nestjs/common';
import { IOrder } from './interfaces/order.interface';
import mongoose, { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { OrderClass } from './schemas/order.schema';


@Injectable()
export class OrderService {
    constructor(
        @InjectModel('Order') private OrderModel: Model<OrderClass>,
    ) { }

    async create(order: IOrder) {
        return await this.OrderModel.create(order)

    }
    async delete(_id: mongoose.Types.ObjectId) {
        return await this.OrderModel.deleteOne({ _id: _id })
    }
    async edit(order: IOrder, _id: mongoose.Types.ObjectId) {
        return await this.OrderModel.updateOne({ _id: _id },
            {
                products: order.products,
                customer: order.customer
            })
    }
}
