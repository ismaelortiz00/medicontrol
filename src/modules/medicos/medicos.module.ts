import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Especialidad } from '../especialidades/entities/especialidad.entity';
import { Medico } from './entities/medico.entity';
import { MedicosController } from './medicos.controller';
import { MedicosService } from './medicos.service';

@Module({
  imports: [TypeOrmModule.forFeature([Medico, Especialidad])],
  controllers: [MedicosController],
  providers: [MedicosService],
})
export class MedicosModule {}
