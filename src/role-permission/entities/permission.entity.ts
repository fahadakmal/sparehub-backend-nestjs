import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Permission {
  @Exclude()
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  permissionName: string;

  @Column()
  description: string;

  @Exclude()
  @Column({ default: true })
  isActive: boolean;

  @Exclude()
  @Column({ length: 10 })
  module: string;

  @Exclude()
  @Column({ length: 20, default: null })
  code: string;

  @Exclude()
  @CreateDateColumn()
  createdOn: Date;

  @Exclude()
  @UpdateDateColumn()
  updatedOn: Date;
}
