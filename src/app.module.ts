import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { SellerModule } from './seller/seller.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.stage.${process.env.STAGE}`],
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
        };
      },
    }),
    AuthModule,
    SellerModule,
  ],
  exports: [],
  controllers: [],
})
export class AppModule {}
