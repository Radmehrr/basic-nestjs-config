import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types, FilterQuery } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { hashPassword } from 'src/utils/bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './models/user.schema';
import { UpdateUserDto } from './dto/update-user.dto';
import { SearchUsersDto } from './dto/search-users.dto';
import { UserRole } from './enum/user-role.enum';
import { query } from 'express';

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
    updateUserDto: UpdateUserDto,
  ): Promise<UserDocument> {
    return await this.userModel.findOneAndUpdate(filterQuery, updateUserDto, {
      new: true,
    });
  }

  async search(searchUsersDto: SearchUsersDto) {
    const userId = searchUsersDto.userId
      ? new Types.ObjectId(searchUsersDto.userId)
      : Types.ObjectId;

    const fullName = searchUsersDto.fullName ? searchUsersDto.fullName : '.*';

    const phone = searchUsersDto.phone ? searchUsersDto.phone : String;

    const role = searchUsersDto.role
      ? [searchUsersDto.role]
      : [UserRole.ADMIN, UserRole.SUPPORT, UserRole.CLIENT];

    let accessBool = searchUsersDto.access ? searchUsersDto.access : 'true';
    accessBool = JSON.parse(accessBool);

    const fromDate = searchUsersDto.fromDate
      ? searchUsersDto.fromDate
      : parseInt(process.env.START_DATE);

    const toDate = searchUsersDto.toDate ? searchUsersDto.toDate : now();

    const limit = searchUsersDto.limit ? searchUsersDto.limit : 10;
    const skip = searchUsersDto.page ? (searchUsersDto.page - 1) * limit : 0;

    return await this.userModel.aggregate([
      {
        $match: {
          _id: userId,
          fullName: {
            $regex: fullName,
            $options: 'i',
          },
          phone,
          role: { $in: role },
          access: accessBool,

          $and: [
            { createdAt: { $gte: fromDate } },
            { createdAt: { $lte: toDate } },
          ],
        },
      },
      { $skip: skip },
      { $limit: limit },
    ]);
  }
}
