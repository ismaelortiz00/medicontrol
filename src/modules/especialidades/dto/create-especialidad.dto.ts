import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
export class CreateEspecialidadDto {
 @ApiProperty({example:'Cardiología'}) @IsString() @IsNotEmpty() nombre:string;
 @ApiProperty({example:true,required:false}) @IsBoolean() @IsOptional() estado?:boolean;
}
