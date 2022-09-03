import {
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';
import { DocumentType } from 'src/common/modules/documentType/entities/document_type.entity';

export class CreateCompanyDocumentDto {
  @IsOptional()
  @IsNumber()
  id: number;
  @IsString()
  @IsNotEmpty()
  documentPath: string;
  @IsOptional()
  @IsObject()
  docType: DocumentType;
}
