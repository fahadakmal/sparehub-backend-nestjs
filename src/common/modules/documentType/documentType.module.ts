import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { DocumentTypeController } from './documentType.controller';
import { DocumentTypeService } from './documentType.service';
import { DocumentType } from './entities/document_type.entity';

@Module({
  imports: [ConfigModule, AuthModule, TypeOrmModule.forFeature([DocumentType])],
  controllers: [DocumentTypeController],
  providers: [DocumentTypeService],
})
export class DocumentTypeModule {}
