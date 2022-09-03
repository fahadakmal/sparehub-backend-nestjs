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
import { Bank } from '../../common/modules/bank/entities/bank.entity';
import { Company } from './company.entity';

@Entity('company_bank')
export class CompanyBank {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Company)
  @JoinColumn({ name: 'coId', referencedColumnName: 'id' })
  company: Company;

  @Column({ length: 100, nullable: true })
  accountTitle: string;

  @Column({ length: 100, nullable: true })
  accountNo: string;

  @Column({ length: 100, nullable: true })
  iban: string;

  @ManyToOne(() => Bank, (bank) => bank.companyBanks)
  bank: Bank;

  @Column({ length: 20, nullable: true })
  branchCode: string;

  @Column({ default: true })
  status: boolean;

  @CreateDateColumn()
  createdOn: Date;

  @UpdateDateColumn()
  updatedOn: Date;
}
