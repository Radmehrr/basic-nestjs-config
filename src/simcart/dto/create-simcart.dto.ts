import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsNotEmpty, IsString } from 'class-validator';
import { SimCategory } from '../enum/category.enum';
import { SimStatus } from '../enum/status.enum';
import { SimType } from '../enum/type.enum';

export class CreateSimcartDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '09172562637' })
  phoneNumber: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'توضیحات نمیدونم هرچی' })
  title: string;

  @IsInt()
  @IsNotEmpty()
  @ApiProperty({ example: 70000 })
  price: number;

  @IsString()
  @IsNotEmpty()
  @IsEnum(SimCategory)
  @ApiProperty({ example: SimCategory.HAMRAHE_AVAL })
  category: SimCategory;

  @IsString()
  @IsNotEmpty()
  @IsEnum(SimStatus)
  @ApiProperty({ example: SimStatus.ZERO })
  status: SimStatus;

  @IsString()
  @IsNotEmpty()
  @IsEnum(SimType)
  @ApiProperty({ example: SimType.CREDIT })
  type: SimType;
}
