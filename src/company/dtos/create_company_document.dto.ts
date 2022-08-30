import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { DocumentType } from 'src/common/modules/documentType/entities/document_type.entity';

export class CreateCompanyDocumentDto {
  @IsOptional()
  @IsNumber()
  id: number;
  @IsString()
  @IsNotEmpty()
  documentPath: string;
  @IsNumber()
  docType: DocumentType;
}
