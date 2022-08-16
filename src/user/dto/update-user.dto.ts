import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'کسرا افشاری' })
  fullName: string;
}
