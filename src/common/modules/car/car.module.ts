import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { CarController } from './car.controller';
import { CarService } from './car.service';
import { CarMake } from './entities/car_make.entity';
import { CarModel } from './entities/car_model.entity';
import { CarVariant } from './entities/car_variant.entity';
import { CarType } from './entities/car_type.entities';
import { CarMadeYear } from './entities/car_made_year.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CarModel,
      CarMake,
      CarVariant,
      CarType,
      CarMadeYear,
    ]),
    AuthModule,
    ConfigModule,
  ],
  controllers: [CarController],
  providers: [CarService],
})
export class CarModule {}
