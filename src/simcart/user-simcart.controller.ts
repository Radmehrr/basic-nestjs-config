import { Body, Controller, Post, UseFilters, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { TranslatorFilter } from 'nestjs-translator';
import { JwtAuthGuard } from 'src/user/strategy/jwt-guard.guard';
import { CreateSimcartDto } from './dto/create-simcart.dto';
import { SimcartService } from './simcart.service';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('user/simcart')
@UseFilters(TranslatorFilter)
@ApiTags('user/simcart')
export class UserSimcartController {
  constructor(private readonly simcartService: SimcartService) {}
}
