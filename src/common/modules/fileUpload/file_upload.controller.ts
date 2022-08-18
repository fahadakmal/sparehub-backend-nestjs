import {
  Controller,
  UseGuards,
  UseInterceptors,
  Post,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AwsCognitoGuard } from 'src/auth/guards/awsCognito.guard';
import { FileUploadService } from './file_upload.service';
@Controller('upload')
@UseGuards(AwsCognitoGuard)
export class FileUploadController {
  constructor(private fileUploadService: FileUploadService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async upload(@UploadedFile() file) {
    return await this.fileUploadService.upload(file);
  }
}
