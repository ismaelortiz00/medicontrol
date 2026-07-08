import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePacienteDto } from './dto/create-paciente.dto';
import { UpdatePacienteDto } from './dto/update-paciente.dto';
import { Paciente } from './entities/paciente.entity';

@Injectable()
export class PacientesService {
  constructor(@InjectRepository(Paciente) private readonly repository: Repository<Paciente>) {}

  create(dto: CreatePacienteDto) {
    return this.repository.save(this.repository.create(dto));
  }

  findAll() {
    return this.repository.find({ order: { id: 'ASC' } });
  }

  async findOne(id: number) {
    const item = await this.repository.findOne({ where: { id } as any });
    if (!item) throw new NotFoundException('Paciente no encontrado');
    return item;
  }

  async update(id: number, dto: UpdatePacienteDto) {
    const item = await this.findOne(id);
    Object.assign(item, dto);
    return this.repository.save(item);
  }

  async remove(id: number) {
    const item = await this.findOne(id);
    return this.repository.remove(item);
  }
}
