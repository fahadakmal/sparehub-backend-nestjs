import { Expose } from 'class-transformer';

export class CarMadeYearDto {
  @Expose()
  id: number;
  @Expose()
  madeYear: string;
}
