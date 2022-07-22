import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateCompanyDocumentDto {
  @IsOptional()
  @IsNumber()
  id: number;
  @IsString()
  documentPath: string;
  @IsNumber()
  docTypeId: number;
  @IsBoolean()
  saveAsDraft: boolean;
}
