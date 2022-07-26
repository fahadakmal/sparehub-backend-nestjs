import { S3 } from 'aws-sdk';
import { Injectable, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ACCEPT_MIME_TYPES } from './accept-mime-types';

@Injectable()
export class FileUploadService {
  constructor(private configService: ConfigService) {}
  async upload(file) {
    try {
      const { originalname, mimeType } = file;
      if (!ACCEPT_MIME_TYPES.includes(mimeType)) {
        throw new BadRequestException();
      }
      const bucketS3 = this.configService.get('S3_BUCKET_NAME');
      return await this.uploadS3(file.buffer, bucketS3, originalname);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async uploadS3(file, bucket, name) {
    const s3 = this.getS3();
    const params = {
      Bucket: bucket,
      Key: String(name),
      Body: file,
    };
    return new Promise((resolve, reject) => {
      s3.upload(params, (err, data) => {
        if (err) {
          reject(err.message);
        }
        resolve(data);
      });
    });
  }

  getS3() {
    return new S3({
      accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID'),
      secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY'),
      region: this.configService.get('AWS_S3_REGION'),
    });
  }
}
