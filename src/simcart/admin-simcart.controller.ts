import {
  BadRequestException,
  Body,
  Controller,
  Post,
  SetMetadata,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { TranslatorFilter } from 'nestjs-translator';
import { hasRoles } from 'src/decorators/roles.decorator';
import { UserRole } from 'src/user/enum/user-role.enum';
import { RolesGuard } from 'src/user/guards/role.guard';
import { JwtAuthGuard } from 'src/user/strategy/jwt-guard.guard';
import { CreateSimcartDto } from './dto/create-simcart.dto';
import { SimcartService } from './simcart.service';

@ApiBearerAuth()
@Controller('admin/simcart')
@UseFilters(TranslatorFilter)
@ApiTags('admin/simcart')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AdminSimcartController {
  constructor(private readonly simcartService: SimcartService) {}

  @hasRoles(UserRole.ADMIN, UserRole.SUPPORT)
  @Post()
  async createSimcart(@Body() createSimcartDto: CreateSimcartDto) {
    const simcart = await this.simcartService.findOne({
      phoneNumber: createSimcartDto.phoneNumber,
    });

    if (simcart) {
      throw new BadRequestException('simcart.already_exists.');
    }

    return await this.simcartService.createSimcart(createSimcartDto);
  }
}
