import { ContactService } from "./../services/contacts.service";
import { Request, Response } from "express";

export const ContactController = {
    async getAll(req: Request, res: Response) {
        const data = await ContactService.getAll(req);
        return res.json(data);
    },
    async create(req: Request, res: Response) {
        const data = await ContactService.create(req);
        return res.status(201).json(data);
    },
    async getById(req: Request, res: Response) {
        const data = await ContactService.getById(req);
        return res.json(data);
    },
    async update(req: Request, res: Response) {
        const data = await ContactService.update(req);
        return res.json(data);
    },
    async delete(req: Request, res: Response) {
        const data = await ContactService.delete(req);
        return res.status(204).json(data);
    },
};
