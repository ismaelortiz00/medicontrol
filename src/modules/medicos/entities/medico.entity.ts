import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Cita } from '../../citas/entities/cita.entity';
import { Especialidad } from '../../especialidades/entities/especialidad.entity';

@Entity('medicos')
export class Medico {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  nombres: string;

  @Column({ length: 100 })
  apellidos: string;

  @ManyToOne(() => Especialidad, especialidad => especialidad.medicos, { eager: true, nullable: true })
  especialidad: Especialidad;

  @Column({ length: 20 })
  telefono: string;

  @Column({ unique: true })
  correo: string;

  @Column({ default: true })
  estado: boolean;

  @OneToMany(() => Cita, cita => cita.medico)
  citas: Cita[];

  @CreateDateColumn()
  fecha_creacion: Date;
}
