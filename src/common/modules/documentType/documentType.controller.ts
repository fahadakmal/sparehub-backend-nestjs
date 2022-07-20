import {
  ClassSerializerInterceptor,
  Controller,
  UseGuards,
  UseInterceptors,
  Get,
} from '@nestjs/common';
import { AwsCognitoGuard } from 'src/auth/guards/awsCognito.guard';
import { DocumentTypeService } from './documentType.service';
import { DocumentType } from './entities/document_type.entity';
@Controller('documentType')
@UseGuards(AwsCognitoGuard)
export class DocumentTypeController {
  constructor(private documentTypeService: DocumentTypeService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  getDocumentTypes(): Promise<DocumentType[]> {
    return this.documentTypeService.getDocumentTypes();
  }
}
