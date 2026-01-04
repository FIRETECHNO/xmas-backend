import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ProductService } from './product.service';
import { IProduct } from './interfaces/product.interface';
import ApiError from 'src/exceptions/errors/api-error';
import { IProductToEdit } from './interfaces/IProductToEdit';
import { ProductDocument } from './schemas/product.schema';

@Controller('product')
export class ProductController {
  constructor(private ProductService: ProductService) {}
  @HttpCode(HttpStatus.CREATED)
  @Post('create')
  async create(@Body('product') product: IProduct) {
    let productData: ProductDocument =
      await this.ProductService.create(product);
    return {
      success: true,
      data: productData,
    };
  }

  @HttpCode(HttpStatus.OK)
  @Post('delete')
  async delete(@Body('_id') _id?: string) {
    if (_id) {
      const deletedProduct: ProductDocument | null =
        await this.ProductService.deleteById(_id);

      return {
        success: true,
        product: deletedProduct,
      };
    } else {
      throw ApiError.BadRequest('Необходимо указать id');
    }
  }

  @HttpCode(HttpStatus.OK)
  @Post('edit')
  async edit(
    @Body('_id') _id?: string,
    @Body('updates') updates?: IProductToEdit,
  ) {
    if (!updates || Object.keys(updates).length === 0) {
      throw ApiError.BadRequest('Не переданы данные для обновления');
    }

    let editedProduct: ProductDocument | null;

    if (_id) {
      editedProduct = await this.ProductService.editById(updates, _id);
    } else {
      throw ApiError.BadRequest('Необходимо указать id');
    }

    return {
      success: true,
      product: editedProduct,
    };
  }
}
