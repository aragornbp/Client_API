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
            relations: {
                client: true,
            },
        });
        if (!foundContact) {
            throw new AppError("Contact Not Found", 404);
        }
        return foundContact;
    },
    async getAll(req: Request) {
        return await contactRepo.find({
            relations: {
                client: true,
            },
        });
    },
    async create(req: Request) {
        const contactData: IContactCreateRequest = req.body;
        const newContact = contactRepo.create(contactData);
        await contactRepo.save(newContact);
        return await this.findContactById(newContact.id);
    },
    async getById(req: Request): Promise<Contact | null> {
        const { id } = req.params;
        return await contactRepo.findOne({
            where: {
                id,
            },
            relations: {
                client: true,
            },
        });
    },
    async update(req: Request): Promise<Contact> {
        const { id } = req.params;
        const contactData: IContactUpdateRequest = req.body;
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
