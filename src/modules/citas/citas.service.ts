import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EstadoCita } from '../../common/enums/estado-cita.enum';
import { Medico } from '../medicos/entities/medico.entity';
import { Paciente } from '../pacientes/entities/paciente.entity';
import { CreateCitaDto } from './dto/create-cita.dto';
import { UpdateCitaDto } from './dto/update-cita.dto';
import { Cita } from './entities/cita.entity';

@Injectable()
export class CitasService {
 constructor(@InjectRepository(Cita) private readonly citaRepository:Repository<Cita>, @InjectRepository(Paciente) private readonly pacienteRepository:Repository<Paciente>, @InjectRepository(Medico) private readonly medicoRepository:Repository<Medico>) {}
 async create(dto:CreateCitaDto){
  const paciente=await this.pacienteRepository.findOne({where:{id:dto.paciente_id}});
  if(!paciente) throw new NotFoundException('Paciente no encontrado');
  const medico=await this.medicoRepository.findOne({where:{id:dto.medico_id}});
  if(!medico) throw new NotFoundException('Médico no encontrado');
  const existe=await this.citaRepository.findOne({where:{medico:{id:dto.medico_id},fecha:dto.fecha,hora:dto.hora}});
  if(existe) throw new ConflictException('El médico ya tiene una cita en esa fecha y hora');
  return this.citaRepository.save(this.citaRepository.create({paciente,medico,fecha:dto.fecha,hora:dto.hora,motivo:dto.motivo,estado:dto.estado??EstadoCita.PROGRAMADA}));
 }
 findAll(){ return this.citaRepository.find({order:{id:'ASC'}}); }
 async findOne(id:number){ const cita=await this.citaRepository.findOne({where:{id}}); if(!cita) throw new NotFoundException('Cita no encontrada'); return cita; }
 async update(id:number,dto:UpdateCitaDto){ const cita=await this.findOne(id); cita.fecha=dto.fecha??cita.fecha; cita.hora=dto.hora??cita.hora; cita.motivo=dto.motivo??cita.motivo; cita.estado=dto.estado??cita.estado; return this.citaRepository.save(cita); }
 async remove(id:number){ const cita=await this.findOne(id); return this.citaRepository.remove(cita); }
}
