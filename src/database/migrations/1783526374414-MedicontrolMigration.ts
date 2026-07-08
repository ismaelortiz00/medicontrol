import { MigrationInterface, QueryRunner } from "typeorm";

export class MedicontrolMigration1783526374414 implements MigrationInterface {
    name = 'MedicontrolMigration1783526374414'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "roles" ("id" SERIAL NOT NULL, "nombre" character varying(50) NOT NULL, "estado" boolean NOT NULL DEFAULT true, CONSTRAINT "UQ_a5be7aa67e759e347b1c6464e10" UNIQUE ("nombre"), CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "usuarios" ("id" SERIAL NOT NULL, "nombre" character varying(100) NOT NULL, "apellido" character varying(100) NOT NULL, "correo" character varying NOT NULL, "password" character varying NOT NULL, "estado" boolean NOT NULL DEFAULT true, "fecha_creacion" TIMESTAMP NOT NULL DEFAULT now(), "rolId" integer, CONSTRAINT "UQ_63665765c1a778a770c9bd585d3" UNIQUE ("correo"), CONSTRAINT "PK_d7281c63c176e152e4c531594a8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "especialidades" ("id" SERIAL NOT NULL, "nombre" character varying(100) NOT NULL, "estado" boolean NOT NULL DEFAULT true, CONSTRAINT "UQ_e86aa92137833eed8ba2656dbc0" UNIQUE ("nombre"), CONSTRAINT "PK_73c2740deb4cbe08c28ac487705" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "medicos" ("id" SERIAL NOT NULL, "nombres" character varying(100) NOT NULL, "apellidos" character varying(100) NOT NULL, "telefono" character varying(20) NOT NULL, "correo" character varying NOT NULL, "estado" boolean NOT NULL DEFAULT true, "fecha_creacion" TIMESTAMP NOT NULL DEFAULT now(), "especialidadId" integer, CONSTRAINT "UQ_a44cef2fa49e8d589b2595e8671" UNIQUE ("correo"), CONSTRAINT "PK_f16d578e9fd6df731d5e8551725" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."citas_estado_enum" AS ENUM('programada', 'atendida', 'cancelada')`);
        await queryRunner.query(`CREATE TABLE "citas" ("id" SERIAL NOT NULL, "fecha" date NOT NULL, "hora" TIME NOT NULL, "motivo" character varying(200) NOT NULL, "estado" "public"."citas_estado_enum" NOT NULL DEFAULT 'programada', "fecha_creacion" TIMESTAMP NOT NULL DEFAULT now(), "pacienteId" integer, "medicoId" integer, CONSTRAINT "PK_43851fd780e10030fbe5bb1b912" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "pacientes" ("id" SERIAL NOT NULL, "cedula" character varying(15) NOT NULL, "nombres" character varying(100) NOT NULL, "apellidos" character varying(100) NOT NULL, "fecha_nacimiento" date NOT NULL, "direccion" character varying(150) NOT NULL, "telefono" character varying(20) NOT NULL, "email" character varying, "estado" boolean NOT NULL DEFAULT true, "fecha_creacion" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_e3bde26ff02d7070303bb234c7c" UNIQUE ("cedula"), CONSTRAINT "PK_aa9c9f624ff22fc06c44d8b1609" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "usuarios" ADD CONSTRAINT "FK_df0c94be5a01a546bf1b9ca12ae" FOREIGN KEY ("rolId") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "medicos" ADD CONSTRAINT "FK_deb347aeeeceb9b06d12bd60a6c" FOREIGN KEY ("especialidadId") REFERENCES "especialidades"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "citas" ADD CONSTRAINT "FK_8fd4b119d549914f5bafe0cc189" FOREIGN KEY ("pacienteId") REFERENCES "pacientes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "citas" ADD CONSTRAINT "FK_55f6046b4622b127d119acd7282" FOREIGN KEY ("medicoId") REFERENCES "medicos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "citas" DROP CONSTRAINT "FK_55f6046b4622b127d119acd7282"`);
        await queryRunner.query(`ALTER TABLE "citas" DROP CONSTRAINT "FK_8fd4b119d549914f5bafe0cc189"`);
        await queryRunner.query(`ALTER TABLE "medicos" DROP CONSTRAINT "FK_deb347aeeeceb9b06d12bd60a6c"`);
        await queryRunner.query(`ALTER TABLE "usuarios" DROP CONSTRAINT "FK_df0c94be5a01a546bf1b9ca12ae"`);
        await queryRunner.query(`DROP TABLE "pacientes"`);
        await queryRunner.query(`DROP TABLE "citas"`);
        await queryRunner.query(`DROP TYPE "public"."citas_estado_enum"`);
        await queryRunner.query(`DROP TABLE "medicos"`);
        await queryRunner.query(`DROP TABLE "especialidades"`);
        await queryRunner.query(`DROP TABLE "usuarios"`);
        await queryRunner.query(`DROP TABLE "roles"`);
    }

}
