import { Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { OrderService } from './orders.service';
import { IOrder } from './interfaces/orders.interface';

@Controller('orders')
export class OrderController {

    constructor(
        private readonly orderService: OrderService,
    ) { }

    @HttpCode(HttpStatus.OK)
    @Post('create')
    async create(order: IOrder) {
        return this.orderService.create(order)
    }

    @HttpCode(HttpStatus.OK)
    @Post('delete')
    async delete(_id: string) {
        return this.orderService.delete(_id)
    }

    @HttpCode(HttpStatus.OK)
    @Post('edit')
    async edit(order: IOrder, _id: string) {
        return this.orderService.edit(order, _id)
    }
}