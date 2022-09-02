import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { CarController } from './car.controller';
import { CarService } from './car.service';
import { CarMake } from './entities/car_make.entity';
import { CarModel } from './entities/car_model.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CarModel, CarMake]),
    AuthModule,
    ConfigModule,
  ],
  controllers: [CarController],
  providers: [CarService],
})
export class CarModule {}
