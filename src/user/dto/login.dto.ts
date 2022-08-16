import { IsString, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '09172562637' })
  phone: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(5, { message: 'user.min_length_pass' })
  @ApiProperty({ example: 'rad123' })
  password: string;
}
