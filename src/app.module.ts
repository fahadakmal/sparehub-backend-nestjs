import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { CompanyModule } from './company/company.module';
import { BankModule } from './common/modules/bank/bank.module';
import { AddressModule } from './common/modules/address/address.module';
import { DocumentTypeModule } from './common/modules/documentType/documentType.module';
import { FileUploadModule } from './common/modules/fileUpload/file_upload.module';
import { RolePermissionModule } from './role-permission/role_permission.module';
import { configValidationSchema } from './config.schema';
import { ProductModule } from './product/product.module';
import { ProductCategoryModule } from './common/modules/product_category/product_category.module';
import { BrandModule } from './common/modules/brand/brand.module';
import { CarModule } from './common/modules/car/car.module';
import { ProductTypeModule } from './common/modules/product_type/product_type.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [process.env.ENV_FILE, '.env'],
      validationSchema: configValidationSchema,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          type: 'postgres',
          autoLoadEntities: true,
          synchronize: true,
          host: configService.get('DB_HOST'),
          username: configService.get('DB_USERNAME'),
          port: configService.get('DB_PORT'),
          database: configService.get('DB_DATABASE'),
          password: configService.get('DB_PASSWORD'),
          schema: configService.get('DB_SCHEMA'),
        };
      },
    }),
    AuthModule,
    CompanyModule,
    BankModule,
    AddressModule,
    DocumentTypeModule,
    FileUploadModule,
    RolePermissionModule,
    ProductModule,
    ProductCategoryModule,
    BrandModule,
    CarModule,
    ProductTypeModule,
  ],
  exports: [],
  controllers: [],
})
export class AppModule {}
