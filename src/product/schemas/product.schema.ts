import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type ProductDocument = HydratedDocument<ProductClass>;

@Schema()
export class ProductClass {
  @Prop({
    type: String,
    required: true,
  })
  name: string;

  @Prop({
    type: String,
    required: true,
  })
  category: string;

  @Prop({
    type: Array,
    default: [],
    required: true,
  })
  images: string[];

  @Prop({
    type: Array,
    default: [],
    required: true,
  })
  variants: any[];
}

export const ProductSchema = SchemaFactory.createForClass(ProductClass);
