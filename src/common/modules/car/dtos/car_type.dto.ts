import { Expose } from 'class-transformer';

export class CarTypeDto {
  @Expose()
  id: number;
  @Expose()
  carTypeName: string;
  @Expose()
  carTypeNameAr: string;
}
