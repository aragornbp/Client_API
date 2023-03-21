import { contactRepo } from "../repositories/contact-repo";
import {
    IContactCreateRequest,
    IContactUpdateRequest,
} from "../interfaces/contacts";
import { AppError } from "../errors/app-error";
import { Contact } from "../entities/Contact";
import { UpdateResult } from "typeorm";
import { Request } from "express";
import "express-async-errors";
import { updateContactSchema } from "../schemas/contacts";
import { clientRepo } from "./../repositories/client-repo";

export const ContactService = {
    async findContactById(id: string): Promise<Contact> {
        const foundContact = await contactRepo.findOne({
            select: [
                "id",
                "name",
                "email",
                "phone",
                "registered_date",
                "client",
            ],
            where: {
                id: id,
            },
            relations: {
                client: {
                    password: false,
                },
            },
        });
        if (!foundContact) {
            throw new AppError("Contact Not Found", 404);
        }
        return foundContact;
    },
    async getAll(req: Request) {
        return await contactRepo.find({
            where: {
                is_active: true,
            },
            relations: {
                client: true,
            },
        });
    },
    async create(req: Request) {
        const body: IContactCreateRequest = req.body;
        const clientLogged = req.clientFound;
        const newContact = contactRepo.create({
            ...body,
            client: clientLogged,
        });
        await contactRepo.save(newContact);
        return newContact;
    },
    async getById(req: Request): Promise<Contact | null> {
        const { id } = req.params;
        return await this.findContactById(id);
    },
    async update(req: Request): Promise<Contact> {
        const { id } = req.params;
        const validatedData = await updateContactSchema.validate(req.body, {
            stripUnknown: true,
        });
        const { email, is_active, name, phone } = validatedData;
        if (!email && !is_active && !name && !phone) {
            throw new AppError(
                "Enter at least one field ['email', 'name', 'is_active', 'phone']",
                400
            );
        }
        await contactRepo.update(id, validatedData);
        return await this.findContactById(id);
    },
    async delete(req: Request): Promise<UpdateResult> {
        const { id } = req.params;
        return await contactRepo.update(id, {
            is_active: false,
        });
    },
};
