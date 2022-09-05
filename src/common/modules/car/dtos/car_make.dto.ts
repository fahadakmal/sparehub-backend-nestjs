import { Expose } from 'class-transformer';

export class CarMakeDto {
  @Expose()
  make: string;
  @Expose()
  makeAr: string;
  @Expose()
  region: string;
  @Expose()
  logo: string;
  @Expose()
  sortOrder: string;
}
