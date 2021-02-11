/*
 * @format
 */
import "src/lib/loadEnv";
import { createConnection, ConnectionOptions } from "typeorm";
const { DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_DATABASE } = process.env;
const connectionOptions: ConnectionOptions = {
  type: "postgres",
  host: DB_HOST,
  port: parseInt(DB_PORT, 10),
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  synchronize: false,
};

export const connectDatabase = (entities: any[]) =>
  createConnection({ ...connectionOptions, entities });
