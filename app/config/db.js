import { Sequelize } from "sequelize";
import * as tedious from 'tedious';

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    dialect: 'mssql',
    host: process.env.DB_HOST,
    port: 1433,
    dialectModule: tedious
  })

export {sequelize}