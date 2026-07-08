import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { UsuariosModule } from './modules/usuarios/usuarios.module';
import { RolesModule } from './modules/roles/roles.module';
import { PacientesModule } from './modules/pacientes/pacientes.module';
import { EspecialidadesModule } from './modules/especialidades/especialidades.module';
import { MedicosModule } from './modules/medicos/medicos.module';
import { CitasModule } from './modules/citas/citas.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('DB_HOST'),
        port: Number(config.get<string>('DB_PORT')),
        username: config.get<string>('DB_USER'),
        password: String(config.get<string>('DB_PASSWORD')),
        database: config.get<string>('DB_NAME'),
        autoLoadEntities: true,
        synchronize: false
      }),
    }),
    AuthModule,
    UsuariosModule,
    RolesModule,
    PacientesModule,
    EspecialidadesModule,
    MedicosModule,
    CitasModule,
  ],
})
export class AppModule {}
