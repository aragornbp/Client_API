import { createEntities1679341046419 } from "./migrations/1679341046419-createEntities";
import { Contact } from "./entities/Contact";
import { Client } from "./entities/Client";
import { DataSource } from "typeorm";
import path from "path";
import "dotenv/config";

const entities = [Contact, Client];
const migrations = [createEntities1679341046419];

export const AppDataSource = new DataSource(
    process.env.NODE_ENV === "test"
        ? {
              type: "sqlite",
              database: ":memory:",
              synchronize: true,
              entities: ["src/entities/*.ts"],
          }
        : {
              type: "postgres",
              host: process.env.PGHOST,
              port: parseInt(process.env.PGPORT!),
              username: process.env.PGUSER,
              password: process.env.PGPASSWORD,
              database: process.env.PGDATABASE,
              logging: true,
              synchronize: false,
              entities: entities,
              migrations: migrations,
          }
);
