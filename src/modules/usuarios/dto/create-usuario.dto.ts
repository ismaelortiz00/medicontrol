import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateUsuarioDto {
 @ApiProperty({example:'Ismael'}) @IsString() @IsNotEmpty() nombre:string;
 @ApiProperty({example:'Ortiz'}) @IsString() @IsNotEmpty() apellido:string;
 @ApiProperty({example:'ismael@test.com'}) @IsEmail() correo:string;
 @ApiProperty({example:'123456'}) @IsString() @MinLength(6) password:string;
 @ApiProperty({example:1,required:false}) @IsNumber() @IsOptional() rol_id?:number;
 @ApiProperty({example:true,required:false}) @IsBoolean() @IsOptional() estado?:boolean;
}
