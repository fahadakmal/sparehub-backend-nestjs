import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  RelationId,
} from 'typeorm';
import { Company } from './company.entity';
import { DocumentType } from '../../common/modules/documentType/entities/document_type.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class CompanyDocument {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Company, (company) => company.documents, {
    eager: false,
  })
  company: Company;

  @Column({ nullable: true })
  documentPath: string;

  @ManyToOne(
    () => DocumentType,
    (documentType) => documentType.companyDocuments,
    {
      eager: false,
    },
  )
  docType: DocumentType;

  @RelationId((companyDocument: CompanyDocument) => companyDocument.docType)
  docTypeId: number;

  @Column({ default: true })
  isActive: boolean;

  @Exclude()
  @CreateDateColumn()
  createdOn: Date;

  @Exclude()
  @UpdateDateColumn()
  updatedOn: Date;
}
