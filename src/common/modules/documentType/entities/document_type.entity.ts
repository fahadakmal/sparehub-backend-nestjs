import { Exclude } from 'class-transformer';
import { CompanyDocument } from 'src/company/entities/company_document.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity()
export class DocumentType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50, nullable: true })
  documentName: string;

  @Exclude()
  @Column({ default: false })
  isActive: boolean;

  @Exclude()
  @CreateDateColumn()
  createdOn: Date;

  @Exclude()
  @UpdateDateColumn()
  updatedOn: Date;

  @OneToMany(
    (_type) => CompanyDocument,
    (companyDocument) => companyDocument.docType,
    { eager: false },
  )
  companyDocuments: CompanyDocument[];
}
