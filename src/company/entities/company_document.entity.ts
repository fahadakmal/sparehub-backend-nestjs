import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Company } from './company.entity';
import { DocumentType } from '../../common/modules/documentType/entities/document_type.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class CompanyDocument {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((_type) => Company, (company) => company.documents, {
    eager: false,
  })
  company: Company;

  @Column({ nullable: true })
  documentPath: string;

  @ManyToOne(
    (_type) => DocumentType,
    (documentType) => documentType.companyDocuments,
    {
      eager: false,
    },
  )
  docType: DocumentType;

  @Column({ default: true })
  isActive: boolean;

  @Column({ nullable: false })
  saveAsDraft: boolean;

  @Exclude()
  @CreateDateColumn()
  createdOn: Date;

  @Exclude()
  @UpdateDateColumn()
  updatedOn: Date;
}
