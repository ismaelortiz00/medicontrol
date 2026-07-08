import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { LoginAuthDto } from './login-auth.dto';

export class RegisterAuthDto extends LoginAuthDto {
  @ApiProperty({ example: 'Ismael' })
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @ApiProperty({ example: 'Ortiz' })
  @IsString()
  @IsNotEmpty()
  apellido: string;

  @ApiProperty({ example: 'admin', required: false })
  @IsString()
  @IsOptional()
  rol?: string;
}
