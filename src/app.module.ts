import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.stage.${process.env.STAGE}`,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          type: 'postgres',
          host: configService.get('HOST'),
          port: configService.get('PORT'),
          username: configService.get('USER_NAME'),
          password: configService.get('PASSWORD'),
          database: configService.get('DATABASE'),
          autoLoadEntities: true,
          synchronize: true,
        };
        // return {
        //   type: 'postgres',
        //   host: 'ec2-34-225-159-178.compute-1.amazonaws.com',
        //   port: 5432,
        //   username: 'tthchghhteqpmp',
        //   password:
        //     '6b63974b7561ef13b12bca7ab038a071157ffddc42dd9d4654b41d4911c07e8a',
        //   database: 'dej9c32kp413c2',
        //   autoLoadEntities: true,
        //   synchronize: true,
        //   // ssl: true,
        //   // url: 'postgres://tthchghhteqpmp:6b63974b7561ef13b12bca7ab038a071157ffddc42dd9d4654b41d4911c07e8a@ec2-34-225-159-178.compute-1.amazonaws.com:5432/dej9c32kp413c2',
        // };
      },
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [],
})
export class AppModule {}
