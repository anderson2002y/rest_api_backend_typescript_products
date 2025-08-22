import { Sequelize } from "sequelize-typescript";
import dotenv from 'dotenv';

dotenv.config(); // Carga las variables de entorno

const db = new Sequelize(process.env.DATABASE_URL!, { models: [__dirname + '/../models/**/*'], logging: false }); 

export default db;
