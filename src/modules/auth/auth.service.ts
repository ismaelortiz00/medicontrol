import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { Rol } from '../roles/entities/rol.entity';
import { Usuario } from '../usuarios/entities/usuario.entity';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Usuario) private readonly usuarioRepository: Repository<Usuario>,
    @InjectRepository(Rol) private readonly rolRepository: Repository<Rol>,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: RegisterAuthDto) {
    let rol = await this.rolRepository.findOne({ where: { nombre: dto.rol || 'recepcionista' } });
    if (!rol) rol = await this.rolRepository.save(this.rolRepository.create({ nombre: dto.rol || 'recepcionista' }));
    const usuario = this.usuarioRepository.create({
      nombre: dto.nombre,
      apellido: dto.apellido,
      correo: dto.correo,
      password: await bcrypt.hash(dto.password, 10),
      rol,
      estado: true,
    });
    const saved = await this.usuarioRepository.save(usuario);
    return { id: saved.id, nombre: saved.nombre, apellido: saved.apellido, correo: saved.correo, rol: saved.rol };
  }

  async login(dto: LoginAuthDto) {
    const usuario = await this.usuarioRepository.findOne({ where: { correo: dto.correo } });
    if (!usuario) throw new UnauthorizedException('Credenciales incorrectas');
    const valido = await bcrypt.compare(dto.password, usuario.password);
    if (!valido) throw new UnauthorizedException('Credenciales incorrectas');
    const payload = { sub: usuario.id, correo: usuario.correo, rol: usuario.rol?.nombre };
    return {
      access_token: await this.jwtService.signAsync(payload),
      usuario: { id: usuario.id, nombre: usuario.nombre, correo: usuario.correo, rol: usuario.rol?.nombre },
    };
  }
}
