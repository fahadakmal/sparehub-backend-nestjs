import { Expose } from 'class-transformer';

export class CarModelDto {
  @Expose()
  id: number;
  @Expose()
  modelName: string;
  @Expose()
  modelNameAr: string;
  @Expose()
  region: string;
  @Expose()
  sortOrder: string;
}
