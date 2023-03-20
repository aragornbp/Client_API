import { AppDataSource } from "./../data-source";
import { Client } from "../entities/Client";

export const clientRepo = AppDataSource.getRepository(Client);
