import { Injectable } from '@nestjs/common';
import { ProductClass, ProductDocument } from './schemas/product.schema';
import { Model } from 'mongoose';
import ApiError from 'src/exceptions/errors/api-error';
import { InjectModel } from '@nestjs/mongoose';
import { IProduct } from './interfaces/product.interface';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel('Product') private ProductModel: Model<ProductClass>,
  ) {}

  async create(product: IProduct) {
    const candidate = await this.ProductModel.findOne({ name: product.name });

    if (candidate)
      throw ApiError.BadRequest(
        `Товар с таким именем ${product.name} уже существует`,
      );

    const created_product: ProductDocument =
      await this.ProductModel.create(product);

    return {
      product: created_product,
    };
  }

  async editById(properties: any, productId: string) {
    const candidate = await this.ProductModel.findOne({ id: productId });

    if (candidate)
      throw ApiError.BadRequest(
        `Товар с таким именем ${productId} уже существует`,
      );

    const edited_product = await this.ProductModel.findByIdAndUpdate(
      productId,
      { $set: properties },
    );

    return {
      product: edited_product,
    };
  }

  async editByName(properties: any, productName: string) {
    const candidate = await this.ProductModel.findOne({ id: productName });

    if (candidate)
      throw ApiError.BadRequest(
        `Товар с таким именем ${productName} уже существует`,
      );

    const edited_product = await this.ProductModel.findOneAndUpdate(
      { name: productName },
      { $set: properties },
    );

    return {
      product: edited_product,
    };
  }

  async update(newProduct: IProduct, productId: string) {
    return await this.ProductModel.findByIdAndUpdate(productId, newProduct, {
      new: true,
      runValidators: true,
    });
  }

  async deleteByName(productName: string) {
    const candidate = await this.ProductModel.findOne({ name: productName });

    if (!candidate) {
      throw ApiError.BadRequest(`Товар с именем "${productName}" не найден`);
    }

    // Удаляем товар
    const deletedProduct = await this.ProductModel.findOneAndDelete({
      name: productName,
    });

    return {
      product: deletedProduct,
    };
  }
  async deleteById(productId: string) {
    const candidate = await this.ProductModel.findOne({ name: productId });

    if (!candidate) {
      throw ApiError.BadRequest(`Товар с таким id "${productId}" не найден`);
    }
    const deletedProduct = await this.ProductModel.findByIdAndDelete(productId);

    return {
      product: deletedProduct,
    };
  }
}
