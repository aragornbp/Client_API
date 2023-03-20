import { AppDataSource } from "./../data-source";
import { Contact } from "./../entities/Contact";

export const contactRepo = AppDataSource.getRepository(Contact);
