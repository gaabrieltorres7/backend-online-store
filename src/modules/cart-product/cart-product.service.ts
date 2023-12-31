import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreatedCartDTO,
  CreatedCartProductDTO,
  InsertProductToCartDTO,
  UpdateCartDTO,
} from '../cart/dto/cart.dto';
import { ProductService } from '../product/product.service';
import { ICartProductRepository } from './repositories/cart-product-interface';

@Injectable()
export class CartProductService {
  constructor(
    private readonly cartProductRepository: ICartProductRepository,
    private readonly productService: ProductService,
  ) {}

  async verifyProductToCart(
    productId: number,
    cartId: number,
  ): Promise<CreatedCartProductDTO> {
    const cartProduct = await this.cartProductRepository.verifyProductToCart(
      productId,
      cartId,
    );

    if (!cartProduct) {
      throw new NotFoundException('Product not found in cart');
    }

    return cartProduct;
  }

  async createProductToCart(
    data: InsertProductToCartDTO,
    cartId: number,
  ): Promise<CreatedCartProductDTO> {
    return this.cartProductRepository.createProductToCart(data, cartId);
  }

  async insertProductToCart(
    data: InsertProductToCartDTO,
    cart: CreatedCartDTO,
  ): Promise<CreatedCartProductDTO> {
    await this.productService.findById(data.productId);

    const cartProduct = await this.verifyProductToCart(
      data.productId,
      cart.id,
    ).catch(() => undefined);

    if (!cartProduct) {
      return this.createProductToCart(data, cart.id);
    }

    return this.cartProductRepository.updateProductAmount(
      cartProduct.id,
      cartProduct.amount + data.amount,
    );
  }

  async updateProductInCart(
    updateCartDTO: UpdateCartDTO,
    cart: CreatedCartDTO,
  ): Promise<CreatedCartDTO> {
    await this.productService.findById(updateCartDTO.productId);

    const cartProduct = await this.verifyProductToCart(
      updateCartDTO.productId,
      cart.id,
    );

    return this.cartProductRepository.updateProductToCart(
      updateCartDTO,
      cartProduct,
    );
  }

  async deleteProductCart(productId: number, cartId: number) {
    const cartProduct = await this.verifyProductToCart(productId, cartId);
    return await this.cartProductRepository.deleteProductInCart(
      productId,
      cartProduct.id,
    );
  }
}
