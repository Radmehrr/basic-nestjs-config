import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class AddressDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'فارس' })
  province: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'شیراز' })
  city: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'معالی آباد ساختمان ایران' })
  text: string;
}

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'کسرا افشاری' })
  fullName: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'ali123' })
  password: string;

  @IsOptional()
  @Type(() => AddressDto)
  @ValidateNested({ each: true })
  @ApiProperty({
    example: {
      province: 'فارس',
      city: 'شیراز',
      text: 'معالی آباد ساختمان ایران',
    },
  })
  address: AddressDto;
}
