import { Injectable } from '@nestjs/common';
import { ProductClass, ProductDocument } from './schemas/product.schema';
import { Model } from 'mongoose';
import ApiError from 'src/exceptions/errors/api-error';
import { InjectModel } from '@nestjs/mongoose';
import { IProduct } from './interfaces/product.interface';
import { IProductToEdit } from './interfaces/IProductToEdit';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel('Product') private ProductModel: Model<ProductClass>,
  ) {}

  async create(product: IProduct) {
    const created_product: ProductDocument =
      await this.ProductModel.create(product);
    return created_product;
  }

  async editById(properties: IProductToEdit, productId: string) {
    const candidate = await this.ProductModel.findOne({ id: productId });

    if (candidate)
      throw ApiError.BadRequest(
        `Товар с таким именем ${productId} уже существует`,
      );

    const edited_product = await this.ProductModel.findByIdAndUpdate(
      productId,
      { $set: properties },
    );

    return edited_product;
  }

  async update(newProduct: IProduct, productId: string) {
    return await this.ProductModel.findByIdAndUpdate(productId, newProduct, {
      new: true,
      runValidators: true,
    });
  }

  async deleteById(productId: string) {
    const candidate = await this.ProductModel.findOne({ name: productId });

    if (!candidate) {
      throw ApiError.BadRequest(`Товар с таким id "${productId}" не найден`);
    }
    const deletedProduct = await this.ProductModel.findByIdAndDelete(productId);

    return deletedProduct;
  }
}
