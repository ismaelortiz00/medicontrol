import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CitasService } from './citas.service';
import { CreateCitaDto } from './dto/create-cita.dto';
import { UpdateCitaDto } from './dto/update-cita.dto';

@ApiTags('Citas')
@Controller('citas')
export class CitasController {
 constructor(private readonly service:CitasService){}
 @Post() create(@Body() dto:CreateCitaDto){ return this.service.create(dto); }
 @Get() findAll(){ return this.service.findAll(); }
 @Get(':id') findOne(@Param('id', ParseIntPipe) id:number){ return this.service.findOne(id); }
 @Patch(':id') update(@Param('id', ParseIntPipe) id:number,@Body() dto:UpdateCitaDto){ return this.service.update(id,dto); }
 @Delete(':id') remove(@Param('id', ParseIntPipe) id:number){ return this.service.remove(id); }
}
