import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Medico } from '../../medicos/entities/medico.entity';

@Entity('especialidades')
export class Especialidad {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, unique: true })
  nombre: string;

  @Column({ default: true })
  estado: boolean;

  @OneToMany(() => Medico, medico => medico.especialidad)
  medicos: Medico[];
}
