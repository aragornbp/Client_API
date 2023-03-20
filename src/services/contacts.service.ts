import { contactRepo } from "../repositories/contact-repo";
import {
    IContactCreateRequest,
    IContactUpdateRequest,
} from "../interfaces/contacts";
import { AppError } from "../errors/app-error";
import { Contact } from "../entities/Contact";
import { UpdateResult } from "typeorm";
import { Request } from "express";

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
                id,
            },
        });
        if (!foundContact) {
            throw new AppError("Contact Not Found", 404);
        }
        return foundContact;
    },
    async findContactByEmail(email: string): Promise<Contact> {
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
                email,
            },
        });
        if (!foundContact) {
            throw new AppError("Contact Not Found", 404);
        }
        return foundContact;
    },
    async getAll(req: Request) {
        return await contactRepo.find();
    },
    async create(req: Request) {
        const contactData: IContactCreateRequest = await req.body;
        const newContact = contactRepo.create(contactData);
        await contactRepo.save(newContact);
        return await this.findContactByEmail(newContact.id);
    },
    async getById(req: Request): Promise<Contact | null> {
        const { id } = req.params;
        return await contactRepo.findOneBy({ id });
    },
    async update(req: Request): Promise<Contact> {
        const { id } = req.params;
        const contactData: IContactUpdateRequest = await req.body;
        await contactRepo.update(id, contactData);
        return await this.findContactById(id);
    },
    async delete(req: Request): Promise<UpdateResult> {
        const { id } = req.params;
        return await contactRepo.update(id, {
            is_active: false,
        });
    },
};
