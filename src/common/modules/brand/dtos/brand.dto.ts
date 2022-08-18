import { Expose } from 'class-transformer';

export class BrandDto {
  @Expose()
  id: number;
  @Expose()
  brandName: string;
  @Expose()
  brandNameAr: string;
  @Expose()
  logo: string;
  @Expose()
  sortOrder: string;
}
