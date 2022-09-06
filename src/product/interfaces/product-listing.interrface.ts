import { Product } from '../entities/product.entity';

export type ProductListing = {
  products: Product[];
  totalCount: number;
};
