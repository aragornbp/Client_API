import { Client } from "./../../entities/Client";
import { Contact } from "./../../entities/Contact";

declare global {
    namespace Express {
        interface Request {
            clientFound: Client;
            contactFound: Contact;
        }
    }
}

export {};
