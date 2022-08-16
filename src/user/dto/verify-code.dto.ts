import { IsInt, IsNotEmpty, Min, Max, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class VerifyCodeDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '09172562637' })
  phone: string;

  @IsInt()
  @IsNotEmpty()
  @ApiProperty({ example: 123456 })
  code: number;
}
