import { Expose } from 'class-transformer';

export class CarVariantDto {
  @Expose()
  id: number;
  @Expose()
  variantName: string;
  @Expose()
  variantNameAr: string;
}
