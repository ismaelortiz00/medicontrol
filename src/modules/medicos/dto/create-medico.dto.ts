import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateMedicoDto {
 @ApiProperty({example:'Carlos'}) @IsString() @IsNotEmpty() nombres:string;
 @ApiProperty({example:'Mendoza'}) @IsString() @IsNotEmpty() apellidos:string;
 @ApiProperty({example:1,required:false}) @IsNumber() @IsOptional() especialidad_id?:number;
 @ApiProperty({example:'0987654321'}) @IsString() @IsNotEmpty() telefono:string;
 @ApiProperty({example:'carlos@medicontrol.com'}) @IsEmail() correo:string;
 @ApiProperty({example:true,required:false}) @IsBoolean() @IsOptional() estado?:boolean;
}
