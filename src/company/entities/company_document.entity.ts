import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Company } from './company.entity';
import { DocumentType } from '../../common/modules/documentType/entities/document_type.entity';

@Entity('company_document')
export class CompanyDocument {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Company, { nullable: false })
  @JoinColumn({ name: 'coId', referencedColumnName: 'id' })
  company: Company;

  @Column({ nullable: true })
  documentPath: string;

  @ManyToOne(
    () => DocumentType,
    (documentType) => documentType.companyDocuments,
    { nullable: true },
  )
  docType: DocumentType;

  @Column({ default: true, nullable: false })
  isActive: boolean;

  @CreateDateColumn()
  createdOn: Date;

  @UpdateDateColumn()
  updatedOn: Date;
}
