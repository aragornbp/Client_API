import { DataSource } from "typeorm";
import "reflect-metadata";
import "dotenv/config";
import "express-async-errors";

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
              entities: [`${__dirname}/**/entities/*.{ts,js}`],
              migrations: [`${__dirname}/**/migrations/*.{ts,js}`],
          }
);
