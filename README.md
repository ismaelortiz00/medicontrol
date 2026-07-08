# MediControl Backend Completo

Backend de gestión de citas médicas desarrollado con NestJS, PostgreSQL, TypeORM, Swagger, JWT, validaciones, variables de entorno, migraciones y relaciones.

## Instalación

```bash
npm install
copy .env.example .env
npm run start:dev
```

Swagger:

```text
http://localhost:3000/api/docs
```

## Migraciones

```bash
npm run migration:generate
npm run migration:run
npm run migration:revert
```

## Módulos
- Auth
- Usuarios
- Roles
- Pacientes
- Especialidades
- Médicos
- Citas
