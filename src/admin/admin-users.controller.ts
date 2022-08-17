import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { TranslatorFilter } from 'nestjs-translator';
import { hasRoles } from 'src/decorators/roles.decorator';
import { SearchUsersDto } from 'src/user/dto/search-users.dto';
import { UserRole } from 'src/user/enum/user-role.enum';
import { RolesGuard } from 'src/user/guards/role.guard';
import { JwtAuthGuard } from 'src/user/strategy/jwt-guard.guard';
import { UserService } from 'src/user/user.service';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('admin/users')
@UseFilters(TranslatorFilter)
@ApiTags('admin/users')
export class AdminUsersController {
  constructor(private readonly userService: UserService) {}

  @hasRoles(UserRole.ADMIN, UserRole.SUPPORT)
  @Get('/users')
  async GetUsers(@Query() searchUsersDto: SearchUsersDto) {
    return await this.userService.search(searchUsersDto);
  }
}
