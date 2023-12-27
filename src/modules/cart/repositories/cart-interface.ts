import { CreatedCartDTO } from '../dto/cart.dto';

export abstract class ICartRepository {
  abstract createCart(userId: number): Promise<CreatedCartDTO>;
  abstract getCartByUserId(
    userId: number,
    isRelations?: boolean,
  ): Promise<CreatedCartDTO | null>;
}
