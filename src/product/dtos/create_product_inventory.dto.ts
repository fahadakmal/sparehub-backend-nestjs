import { IsNumber, IsOptional } from 'class-validator';
import { CompanyStore } from 'src/company/entities/company_store.entity';

export class CreateProductInventoryDto {
  @IsOptional()
  id: number;

  @IsNumber()
  quantity: number;

  @IsNumber()
  store: CompanyStore;
}
