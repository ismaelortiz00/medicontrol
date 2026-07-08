import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Especialidad } from '../especialidades/entities/especialidad.entity';
import { CreateMedicoDto } from './dto/create-medico.dto';
import { UpdateMedicoDto } from './dto/update-medico.dto';
import { Medico } from './entities/medico.entity';

@Injectable()
export class MedicosService {
  constructor(
    @InjectRepository(Medico) private readonly medicoRepository: Repository<Medico>,
    @InjectRepository(Especialidad) private readonly especialidadRepository: Repository<Especialidad>,
  ) {}

  async create(dto: CreateMedicoDto) {
    const medico = this.medicoRepository.create(dto);
    if (dto.especialidad_id) {
      const especialidad = await this.especialidadRepository.findOne({ where: { id: dto.especialidad_id } });
      if (!especialidad) throw new NotFoundException('Especialidad no encontrada');
      medico.especialidad = especialidad;
    }
    return this.medicoRepository.save(medico);
  }
  findAll() { return this.medicoRepository.find({ order: { id: 'ASC' } }); }
  async findOne(id:number) { const medico = await this.medicoRepository.findOne({where:{id}}); if(!medico) throw new NotFoundException('Médico no encontrado'); return medico; }
  async update(id:number,dto:UpdateMedicoDto) { const medico=await this.findOne(id); Object.assign(medico,dto); return this.medicoRepository.save(medico); }
  async remove(id:number) { const medico=await this.findOne(id); return this.medicoRepository.remove(medico); }
}
