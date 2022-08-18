import { Expose } from 'class-transformer';

export class CarMakeDto {
  @Expose()
  id: number;
  @Expose()
  makeName: string;
  @Expose()
  makeNameAr: string;
  @Expose()
  region: string;
  @Expose()
  logo: string;
  @Expose()
  sortOrder: string;
}
