import dotenv from 'dotenv';

dotenv.config();

const DB_URL = process.env.DB_URL || "http://localhost:27017";

const SERVER_PORT = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 9000;

const config = {
  mongoUrl: DB_URL,
  port: SERVER_PORT
};

export default config;