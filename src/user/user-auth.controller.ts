import {
  BadRequestException,
  Body,
  Controller,
  Ip,
  NotFoundException,
  Post,
  Res,
  UseFilters,
} from '@nestjs/common';
import { Response } from 'express';
import { TranslatorFilter } from 'nestjs-translator';
import { ConfigService } from '@nestjs/config';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { UserDocument } from './models/user.schema';
import { VerifyCodeDto } from './dto/verify-code.dto';
import { LoginDto } from './dto/login.dto';
import { comparePasswords } from 'src/utils/bcrypt';

@Controller('/user/auth')
@UseFilters(TranslatorFilter)
@ApiTags('user/auth')
export class UserAuthController {
  constructor(
    private readonly userService: UserService,
    private configService: ConfigService,
  ) {}

  @Post('/signUp')
  async signUp(
    @Body() createUserDto: CreateUserDto,
    @Ip() ip,
  ): Promise<UserDocument> {
    const existingUser: UserDocument = await this.userService.findOne({
      phone: createUserDto.phone,
    });
    if (existingUser) {
      throw new BadRequestException('user.already_exists');
    }
    const newUser: UserDocument = await this.userService.createUser(
      createUserDto,
    );
    newUser.ip = ip;
    newUser.code = 123456;
    await newUser.save();
    return newUser;
  }

  @Post('/verify-signUp')
  async verifySignUp(
    @Body() verifyCodeDto: VerifyCodeDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const user: UserDocument = await this.userService.findOne({
      phone: verifyCodeDto.phone,
    });

    if (!user) {
      throw new NotFoundException();
    }

    if (user.access) {
      throw new BadRequestException('user.already_accepted');
    }

    if (user.code !== verifyCodeDto.code) {
      throw new BadRequestException('user.wrong_code');
    }
    user.access = true;
    await user.save();

    const accessToken = await this.userService.createJwt({
      id: user._id,
      phone: user.phone,
    });

    return {
      accessToken,
    };
  }

  @Post('/login')
  async login(@Body() loginDto: LoginDto, @Res({ passthrough: true }) res) {
    if (loginDto.phone.length !== 11) throw new BadRequestException();

    const user: UserDocument = await this.userService.findOne({
      phone: loginDto.phone,
    });

    if (!user) {
      throw new NotFoundException();
    }

    const isCorrectPassword = await comparePasswords(
      loginDto.password,
      user.password,
    );

    if (!isCorrectPassword) {
      throw new BadRequestException('user.wrong_pass');
    }

    if (!user.access) {
      throw new BadRequestException('user.unAuthorized');
    }

    const accessToken = await this.userService.createJwt({
      id: user._id,
      phone: user.phone,
    });

    return { accessToken };
  }
}
