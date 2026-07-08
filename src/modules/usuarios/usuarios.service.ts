import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { Rol } from '../roles/entities/rol.entity';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Usuario } from './entities/usuario.entity';

@Injectable()
export class UsuariosService {
 constructor(@InjectRepository(Usuario) private readonly usuarioRepository: Repository<Usuario>, @InjectRepository(Rol) private readonly rolRepository: Repository<Rol>) {}
 async create(dto: CreateUsuarioDto) {
   const usuario = this.usuarioRepository.create({...dto, password: await bcrypt.hash(dto.password, 10)});
   if(dto.rol_id){ const rol = await this.rolRepository.findOne({where:{id:dto.rol_id}}); if(!rol) throw new NotFoundException('Rol no encontrado'); usuario.rol=rol; }
   return this.usuarioRepository.save(usuario);
 }
 findAll(){ return this.usuarioRepository.find({order:{id:'ASC'}}); }
 async findOne(id:number){ const u=await this.usuarioRepository.findOne({where:{id}}); if(!u) throw new NotFoundException('Usuario no encontrado'); return u; }
 async update(id:number,dto:UpdateUsuarioDto){ const u=await this.findOne(id); if(dto.password) dto.password=await bcrypt.hash(dto.password,10); Object.assign(u,dto); return this.usuarioRepository.save(u); }
 async remove(id:number){ const u=await this.findOne(id); return this.usuarioRepository.remove(u); }
}
