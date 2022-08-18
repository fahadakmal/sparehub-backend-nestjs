import { Expose } from 'class-transformer';

export class ProductTypeDto {
  @Expose()
  id: number;
  @Expose()
  name: string;
  @Expose()
  description: string;
}
