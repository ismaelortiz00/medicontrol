import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDateString, IsEmail, IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';
export class CreatePacienteDto {
 @ApiProperty({example:'1723456790'}) @IsString() @Length(10,15) cedula:string;
 @ApiProperty({example:'María Fernanda'}) @IsString() @IsNotEmpty() nombres:string;
 @ApiProperty({example:'Gómez Ruiz'}) @IsString() @IsNotEmpty() apellidos:string;
 @ApiProperty({example:'1999-03-12'}) @IsDateString() fecha_nacimiento:string;
 @ApiProperty({example:'Quito, Ecuador'}) @IsString() @IsNotEmpty() direccion:string;
 @ApiProperty({example:'0991234567'}) @IsString() @IsNotEmpty() telefono:string;
 @ApiProperty({example:'maria@test.com',required:false}) @IsEmail() @IsOptional() email?:string;
 @ApiProperty({example:true,required:false}) @IsBoolean() @IsOptional() estado?:boolean;
}
