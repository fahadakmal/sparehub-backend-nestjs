import { Controller, Get, UseGuards } from '@nestjs/common';
import { AwsCognitoGuard } from 'src/auth/guards/awsCognito.guard';
import { Serialize } from 'src/common/interceptors/serialize.intercepter';
import { BrandService } from './brand.service';
import { BrandDto } from './dtos/brand.dto';
import { Brand } from './entities/brand.entity';

@UseGuards(AwsCognitoGuard)
@Controller('brand')
export class BrandController {
  constructor(private brandService: BrandService) {}

  @Serialize(BrandDto)
  @Get()
  getBrands(): Promise<Brand[]> {
    return this.brandService.getBrands();
  }
}
