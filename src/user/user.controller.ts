import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { TranslatorFilter } from 'nestjs-translator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { User } from 'src/decorators/user.decorator';
import { UserDocument } from './models/user.schema';
import { JwtAuthGuard } from './strategy/jwt-guard.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';
import { hashPassword } from 'src/utils/bcrypt';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('/user')
@UseFilters(TranslatorFilter)
@ApiTags('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUser(@User() user: UserDocument) {
    return user;
  }

  @Patch('')
  async updateUser(
    @User() user: UserDocument,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const updatedUser: UserDocument = await this.userService.findOneAndUpdate(
      { _id: user._id },
      updateUserDto,
    );

    if (updateUserDto.password) {
      const hash = hashPassword(updateUserDto.password);
      updatedUser.password = hash;
      updatedUser.save();
    }

    return updatedUser;
  }
}
