import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types, FilterQuery } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { hashPassword } from 'src/utils/bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './models/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,

    private jwtService: JwtService,
  ) {}

  async createJwt(payload) {
    return await this.jwtService.signAsync(payload);
  }

  async createUser(createUserDto: CreateUserDto): Promise<UserDocument> {
    const password = hashPassword(createUserDto.password);
    const newUser = await this.userModel.create({ ...createUserDto, password });
    return newUser;
  }

  async findOne(filterQuery: FilterQuery<UserDocument>) {
    return await this.userModel.findOne(filterQuery);
  }

  async find(
    filterQuery: FilterQuery<UserDocument> = {},
  ): Promise<UserDocument[]> {
    return await this.userModel.find(filterQuery);
  }

  async findOneAndUpdate(
    filterQuery: FilterQuery<UserDocument>,
  ): Promise<UserDocument> {
    return await this.userModel.findOneAndUpdate(filterQuery);
  }
}
