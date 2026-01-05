import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type OrderDocument = HydratedDocument<OrderClass>;

@Schema({})
export class OrderClass {
    @Prop({

        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Product',
        required: true


    })
    products: mongoose.Types.ObjectId[] // массив _id, обязательно ссылка на другую коллекцию Product

    @Prop({

        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true

    })

    customer: mongoose.Types.ObjectId // _id покупателя, обязательно ссылка на коллекцию User
}


export const OrderSchema = SchemaFactory.createForClass(OrderClass);