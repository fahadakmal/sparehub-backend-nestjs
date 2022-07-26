import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from 'src/auth/auth.module';
import { FileUploadController } from './file-upload.controller';
import { FileUploadService } from './file-upload.service';

@Module({
  imports: [ConfigModule, AuthModule],
  controllers: [FileUploadController],
  providers: [FileUploadService],
})
export class FileUploadModule {}
