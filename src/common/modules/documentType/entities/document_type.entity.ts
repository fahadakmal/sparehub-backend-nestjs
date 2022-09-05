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

  @Column({ nullable: true })
  documentName: string;

  @Column({ default: true, nullable: false })
  isActive: boolean;

  @Column({ length: 10, nullable: true })
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
