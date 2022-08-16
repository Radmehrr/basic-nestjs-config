import { Controller, Get, UseFilters, UseGuards } from '@nestjs/common';
import { TranslatorFilter } from 'nestjs-translator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { User } from 'src/decorators/user.decorator';
import { UserDocument } from './models/user.schema';
import { JwtAuthGuard } from './strategy/jwt-guard.guard';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('/user')
@UseFilters(TranslatorFilter)
@ApiTags('user')
export class UserController {
  constructor() {}

  @Get()
  async getUser(@User() user: UserDocument) {
    return user;
  }
}
