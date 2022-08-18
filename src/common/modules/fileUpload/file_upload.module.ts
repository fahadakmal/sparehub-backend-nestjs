import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from 'src/auth/auth.module';
import { FileUploadController } from './file_upload.controller';
import { FileUploadService } from './file_upload.service';

@Module({
  imports: [ConfigModule, AuthModule],
  controllers: [FileUploadController],
  providers: [FileUploadService],
})
export class FileUploadModule {}
