import { Exclude } from 'class-transformer';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Bank } from '../../common/modules/bank/entities/bank.entity';

@Entity()
export class CompanyBank {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, nullable: true })
  accountTitle: string;

  @Column({ length: 100, nullable: true })
  accountNo: string;

  @Column({ length: 100, nullable: true })
  iban: string;

  @ManyToOne((_type) => Bank, (bank) => bank.companyBanks, { eager: true })
  bank: Bank;

  @Column({ length: 20, nullable: true })
  branchCode: string;

  @Column({ default: true })
  status: boolean;

  @Column({ nullable: false })
  saveAsDraft: boolean;

  @Exclude()
  @CreateDateColumn()
  createdOn: Date;

  @Exclude()
  @UpdateDateColumn()
  updatedOn: Date;
}
