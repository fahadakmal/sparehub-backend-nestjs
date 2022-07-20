import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DocumentType } from './entities/document_type.entity';

@Injectable()
export class DocumentTypeService {
  constructor(
    @InjectRepository(DocumentType)
    private decumentTypeRepositery: Repository<DocumentType>,
  ) {}
  async getDocumentTypes(): Promise<DocumentType[]> {
    try {
      const documentTypes = await this.decumentTypeRepositery.find({
        where: { isActive: true },
      });
      return documentTypes;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
