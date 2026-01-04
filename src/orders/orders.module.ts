import { Module } from '@nestjs/common';
import { OrderController } from './orders.controller';
import { OrderService } from './orders.service';
import OrderModel from './models/orders.model';
import UserModel from 'src/user/models/user.model';

@Module({
    controllers: [OrderController],
    providers: [OrderService],
    imports: [OrderModel,UserModel],
})
export class OrderModule { }
