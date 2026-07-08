import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Cita } from '../../citas/entities/cita.entity';

@Entity('pacientes')
export class Paciente {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 15, unique: true })
  cedula: string;

  @Column({ length: 100 })
  nombres: string;

  @Column({ length: 100 })
  apellidos: string;

  @Column({ type: 'date' })
  fecha_nacimiento: string;

  @Column({ length: 150 })
  direccion: string;

  @Column({ length: 20 })
  telefono: string;

  @Column({ nullable: true })
  email: string;

  @Column({ default: true })
  estado: boolean;

  @OneToMany(() => Cita, cita => cita.paciente)
  citas: Cita[];

  @CreateDateColumn()
  fecha_creacion: Date;
}
