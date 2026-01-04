import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type ProductDocument = HydratedDocument<ProductClass>;
@Schema({ _id: false })
class IProductVariant {
  @Prop({
    type: String,
    required: true,
  })
  model: string;

  @Prop({
    type: String,
    required: true,
  })
  color: string;

  @Prop({
    type: String,
    required: true,
  })
  size: string;
}
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
  variants: IProductVariant[];
}

export const ProductSchema = SchemaFactory.createForClass(ProductClass);
