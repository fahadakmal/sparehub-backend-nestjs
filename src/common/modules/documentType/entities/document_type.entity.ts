import { Exclude } from 'class-transformer';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
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
}
