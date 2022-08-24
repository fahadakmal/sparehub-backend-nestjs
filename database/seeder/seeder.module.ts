import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeederService } from './seeder.service';
import { ConfigService } from '@nestjs/config';
import { configValidationSchema } from 'src/config.schema';
import { AuthModule } from 'src/auth/auth.module';
import { CompanyModule } from 'src/company/company.module';
import { BankModule } from 'src/common/modules/bank/bank.module';
import { AddressModule } from 'src/common/modules/address/address.module';
import { DocumentTypeModule } from 'src/common/modules/documentType/documentType.module';
import { FileUploadModule } from 'src/common/modules/fileUpload/file_upload.module';
import { RolePermissionModule } from 'src/role-permission/role_permission.module';
import { ProductModule } from 'src/product/product.module';
import { ProductCategoryModule } from 'src/common/modules/product_category/product_category.module';
import { BrandModule } from 'src/common/modules/brand/brand.module';
import { CarModule } from 'src/common/modules/car/car.module';
import { ProductTypeModule } from 'src/common/modules/product_type/product_type.module';
import { User } from 'src/auth/entities/user.entity';
import { UserRole } from 'src/auth/entities/user_role.entity';
import { City } from 'src/common/modules/address/entities/city.entity';
import { State } from 'src/common/modules/address/entities/state.entity';
import { Country } from 'src/common/modules/address/entities/country.entity';
import { Bank } from 'src/common/modules/bank/entities/bank.entity';
import { Brand } from 'src/common/modules/brand/entities/brand.entity';
import { CarMake } from 'src/common/modules/car/entities/car_make.entity';
import { CarType } from 'src/common/modules/car/entities/car_type.entities';
import { CarModel } from 'src/common/modules/car/entities/car_model.entity';
import { CarVariant } from 'src/common/modules/car/entities/car_variant.entity';
import { CarMadeYear } from 'src/common/modules/car/entities/car_made_year.entity';
import { Role } from 'src/role-permission/entities/role.entity';
import { Permission } from 'src/role-permission/entities/permission.entity';
import { ProductCategory } from 'src/common/modules/product_category/entities/product_category.entity';
import { ProductType } from 'src/common/modules/product_type/entities/prodouct_type.entity';
import { DocumentType } from 'src/common/modules/documentType/entities/document_type.entity';

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
          host: configService.get('DB_HOST'),
          username: configService.get('DB_USERNAME'),
          port: configService.get('DB_PORT'),
          database: configService.get('DB_DATABASE'),
          password: configService.get('DB_PASSWORD'),
          autoLoadEntities: true,
        };
      },
    }),
    TypeOrmModule.forFeature([
      User,
      UserRole,
      Country,
      State,
      City,
      Bank,
      Brand,
      CarMake,
      CarType,
      CarModel,
      CarVariant,
      CarMadeYear,
      Role,
      Permission,
      ProductCategory,
      ProductType,
      DocumentType,
    ]),
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

  providers: [Logger, SeederService],
})
export class SeederModule {}
