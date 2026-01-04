import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ProductService } from './product.service';
import { IProduct } from './interfaces/product.interface';
import ApiError from 'src/exceptions/errors/api-error';

@Controller('product')
export class ProductController {
  constructor(private ProductService: ProductService) {}
  @HttpCode(HttpStatus.CREATED)
  @Post('create')
  async create(@Body() product: IProduct) {
    let productData: any = await this.ProductService.create(product);
    return {
      success: true,
      data: productData,
    };
  }

  @HttpCode(HttpStatus.OK)
  @Post('delete')
  async delete(
    @Body('productName') productName: string,
    @Body('id') id?: string,
  ) {
    if (id) {
      const deletedProduct = await this.ProductService.deleteById(id);

      return {
        success: true,
        product: deletedProduct,
      };
    } else if (productName) {
      const deletedProduct =
        await this.ProductService.deleteByName(productName);

      return {
        success: true,
        product: deletedProduct,
      };
    } else {
      throw ApiError.BadRequest('Необходимо указать productName или id');
    }
  }

  @HttpCode(HttpStatus.OK)
  @Post('edit')
  async edite(
    @Body('productName') productName: string,
    @Body('id') id?: string,
    @Body('updates') updates?: any,
  ) {
    if (!updates || Object.keys(updates).length === 0) {
      throw ApiError.BadRequest('Не переданы данные для обновления');
    }

    let editedProduct;

    if (id) {
      editedProduct = await this.ProductService.editById(id, updates);
    } else if (productName) {
      editedProduct = await this.ProductService.editByName(
        productName,
        updates,
      );
    } else {
      throw ApiError.BadRequest('Необходимо указать productName или id');
    }

    return {
      success: true,
      product: editedProduct,
    };
  }
}
