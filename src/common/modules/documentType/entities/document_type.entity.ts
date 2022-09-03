import { CompanyDocument } from 'src/company/entities/company_document.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';

@Entity('document_type')
export class DocumentType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  documentName: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ length: 10, default: null })
  category: string;

  @CreateDateColumn()
  createdOn: Date;

  @UpdateDateColumn()
  updatedOn: Date;

  @OneToMany(
    () => CompanyDocument,
    (companyDocument) => companyDocument.docType,
  )
  @JoinColumn()
  companyDocuments: CompanyDocument;
}
