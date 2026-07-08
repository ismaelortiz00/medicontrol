import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
export class CreateRolDto {
 @ApiProperty({example:'admin'}) @IsString() @IsNotEmpty() nombre:string;
 @ApiProperty({example:true,required:false}) @IsBoolean() @IsOptional() estado?:boolean;
}
