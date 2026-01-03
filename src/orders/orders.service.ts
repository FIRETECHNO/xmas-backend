import { Injectable } from '@nestjs/common';
import { IOrder } from './interfaces/orders.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { OrderClass } from './schemas/orders.schema';


@Injectable()
export class OrderService {
    constructor(
        @InjectModel('User') private OrderModel: Model<OrderClass>,
    ) { }

    async create(order: IOrder) {
        console.log(order)
        return this.OrderModel.create(order)
    }
    async delete(_id: string) {
        return this.OrderModel.deleteOne({ _id: _id })
    }
    async edit(order: IOrder, _id: string) {
        return this.OrderModel.updateOne({ _id: _id },
            {
                products: order.products,
                customer: order.customer
            })
    }
}
