import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { EstadoCita } from '../../../common/enums/estado-cita.enum';
import { Medico } from '../../medicos/entities/medico.entity';
import { Paciente } from '../../pacientes/entities/paciente.entity';

@Entity('citas')
export class Cita {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Paciente, paciente => paciente.citas, { eager: true })
  paciente: Paciente;

  @ManyToOne(() => Medico, medico => medico.citas, { eager: true })
  medico: Medico;

  @Column({ type: 'date' })
  fecha: string;

  @Column({ type: 'time' })
  hora: string;

  @Column({ length: 200 })
  motivo: string;

  @Column({ type: 'enum', enum: EstadoCita, default: EstadoCita.PROGRAMADA })
  estado: EstadoCita;

  @CreateDateColumn()
  fecha_creacion: Date;
}
