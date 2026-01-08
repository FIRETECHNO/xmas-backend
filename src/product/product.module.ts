import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import ProductModel from './models/product.model';

@Module({
  imports: [ProductModel],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
