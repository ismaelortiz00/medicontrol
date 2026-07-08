import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEspecialidadDto } from './dto/create-especialidad.dto';
import { UpdateEspecialidadDto } from './dto/update-especialidad.dto';
import { Especialidad } from './entities/especialidad.entity';

@Injectable()
export class EspecialidadesService {
  constructor(@InjectRepository(Especialidad) private readonly repository: Repository<Especialidad>) {}

  create(dto: CreateEspecialidadDto) {
    return this.repository.save(this.repository.create(dto));
  }

  findAll() {
    return this.repository.find({ order: { id: 'ASC' } });
  }

  async findOne(id: number) {
    const item = await this.repository.findOne({ where: { id } as any });
    if (!item) throw new NotFoundException('Especialidad no encontrado');
    return item;
  }

  async update(id: number, dto: UpdateEspecialidadDto) {
    const item = await this.findOne(id);
    Object.assign(item, dto);
    return this.repository.save(item);
  }

  async remove(id: number) {
    const item = await this.findOne(id);
    return this.repository.remove(item);
  }
}
