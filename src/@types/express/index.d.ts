import { Contact } from "./../../entities/Contact";
import { Client } from "./../../entities/Client";

// declare module "supertest";
// declare module "express";
// declare module "jsonwebtoken";

declare global {
    namespace Express {
        interface Request {
            clientFound: Client;
            contactFound: Contact;
        }
    }
}

export {};
