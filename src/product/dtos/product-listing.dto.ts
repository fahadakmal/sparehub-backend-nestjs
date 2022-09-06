import { Product } from '../entities/product.entity';

export type ProductListingDto = {
  products: Product[];
  totalCount: number;
  nextPage: number;
  pages: number;
  perPageCount: number;
};
