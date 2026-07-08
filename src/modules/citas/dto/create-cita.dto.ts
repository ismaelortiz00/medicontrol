import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { EstadoCita } from '../../../common/enums/estado-cita.enum';

export class CreateCitaDto {
 @ApiProperty({example:1}) @IsInt() paciente_id:number;
 @ApiProperty({example:1}) @IsInt() medico_id:number;
 @ApiProperty({example:'2026-06-20'}) @IsDateString() fecha:string;
 @ApiProperty({example:'10:00'}) @IsString() @IsNotEmpty() hora:string;
 @ApiProperty({example:'Control médico'}) @IsString() @IsNotEmpty() motivo:string;
 @ApiProperty({example:EstadoCita.PROGRAMADA,required:false,enum:EstadoCita}) @IsEnum(EstadoCita) @IsOptional() estado?:EstadoCita;
}
