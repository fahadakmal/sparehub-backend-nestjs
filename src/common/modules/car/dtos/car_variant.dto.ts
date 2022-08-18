import { Expose } from 'class-transformer';

export class CarVariantDto {
  @Expose()
  id: number;
  @Expose()
  variant: string;
}
