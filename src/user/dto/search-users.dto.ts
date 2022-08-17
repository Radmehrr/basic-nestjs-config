import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  IsBooleanString,
} from 'class-validator';
import { UserRole } from '../enum/user-role.enum';

export class SearchUsersDto {
  @IsOptional()
  @IsString()
  @ApiProperty({ example: '62fa0e5027e21b0de1178998', required: false })
  userId: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'کسرا افشاری', required: false })
  fullName: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: '09172562637', required: false })
  phone: string;

  @IsOptional()
  @IsString()
  @IsEnum(UserRole)
  @ApiProperty({ example: UserRole.CLIENT, required: false })
  role: UserRole;

  @IsOptional()
  @IsBooleanString()
  @ApiProperty({ example: 'false', required: false })
  access: string;

  @IsOptional()
  @IsNumber()
  @ApiProperty({ example: 1660554825, required: false })
  fromDate: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty({ example: 1660554825, required: false })
  toDate: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty({ example: 10, required: false })
  limit: number;

  @IsOptional()
  @IsInt()
  @ApiProperty({ example: 1, required: false })
  page: number;
}
