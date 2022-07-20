import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Company } from './company.entity';
import { DocumentType } from '../../common/modules/documentType/entities/document_type.entity';

@Entity()
export class CompanyDocument {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((_type) => Company, (company) => company.documents)
  company: Company;

  @Column()
  documentPath: string;

  @OneToOne(() => DocumentType)
  @JoinColumn()
  docTypeId: DocumentType;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdOn: Date;

  @UpdateDateColumn()
  updatedOn: Date;
}
