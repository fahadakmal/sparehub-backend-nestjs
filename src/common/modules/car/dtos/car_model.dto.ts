import { Expose } from 'class-transformer';

export class CarModelDto {
  @Expose()
  model: string;
  @Expose()
  modelAr: string;
  @Expose()
  region: string;
  @Expose()
  sortOrder: string;
}
