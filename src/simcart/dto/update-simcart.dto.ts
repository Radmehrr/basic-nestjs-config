import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsOptional, IsString } from 'class-validator';
import { SimCategory } from '../enum/category.enum';
import { SimStatus } from '../enum/status.enum';
import { SimType } from '../enum/type.enum';

export class UpdateSimcartDto {
  @IsOptional()
  @IsString()
  @ApiProperty({ example: '09044621042' })
  phoneNumber: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'سیم کارت فوق لاکچری' })
  title: string;

  @IsOptional()
  @IsInt()
  @ApiProperty({ example: 950000 })
  price: number;

  @IsOptional()
  @IsString()
  @IsEnum(SimCategory)
  @ApiProperty({ example: SimCategory.IRAN_CELL })
  category: SimCategory;

  @IsOptional()
  @IsString()
  @IsEnum(SimStatus)
  @ApiProperty({ example: SimStatus.LESSWORK })
  status: SimStatus;

  @IsOptional()
  @IsString()
  @IsEnum(SimType)
  @ApiProperty({ example: SimType.PERMANENT })
  type: SimType;
}
