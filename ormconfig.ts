import { TypeOrmModuleOptions } from '@nestjs/typeorm'
require('dotenv').config();

export = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  name: 'default',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: true
} as TypeOrmModuleOptions;
