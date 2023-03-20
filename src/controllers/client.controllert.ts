import { ClientService } from "../services/clients.service";
import { Request, Response } from "express";

export const ClientController = {
    async getAll(req: Request, res: Response) {
        const data = await ClientService.getAll(req);
        return res.json(data);
    },
    async create(req: Request, res: Response) {
        const data = await ClientService.create(req);
        return res.status(201).json(data);
    },
    async getById(req: Request, res: Response) {
        const data = await ClientService.getById(req);
        return res.json(data);
    },
    async update(req: Request, res: Response) {
        const data = await ClientService.update(req);
        return res.json(data);
    },
    async delete(req: Request, res: Response) {
        const data = await ClientService.delete(req);
        return res.status(204).json(data);
    },
};
