import { clientRepo } from "./../repositories/client-repo";
import { AppError } from "../errors/app-error";
import { Client } from "./../entities/Client";
import { Request } from "express";
import { hash } from "bcryptjs";
import {
    IClientCreateRequest,
    IClientUpdateRequest,
} from "../interfaces/clients";
import { UpdateResult } from "typeorm";

export const ClientService = {
    async findUserById(id: string): Promise<Client> {
        const foundUser = await clientRepo.findOne({
            select: [
                "id",
                "name",
                "email",
                "phone",
                "contacts",
                "registered_date",
            ],
            where: {
                id,
            },
        });
        if (!foundUser) {
            throw new AppError("Client Not Found", 404);
        }
        return foundUser;
    },
    async findUserByEmail(email: string): Promise<Client> {
        const foundUser = await clientRepo.findOne({
            select: [
                "id",
                "name",
                "email",
                "phone",
                "contacts",
                "registered_date",
            ],
            where: {
                email,
            },
        });
        if (!foundUser) {
            throw new AppError("Client Not Found", 404);
        }
        return foundUser;
    },
    async getAll(req: Request) {
        return await clientRepo.find({
            select: [
                "id",
                "name",
                "email",
                "is_active",
                "phone",
                "registered_date",
                "contacts",
            ],
        });
    },
    async create(req: Request) {
        const clientData: IClientCreateRequest = await req.body;
        const passCrypt = await hash(clientData.password, 8);
        const newPerson = clientRepo.create({
            ...clientData,
            password: passCrypt,
        });
        await clientRepo.save(newPerson);
        return await this.findUserByEmail(newPerson.id);
    },
    async getById(req: Request): Promise<Client | null> {
        const { id } = req.params;
        return await clientRepo.findOneBy({ id });
    },
    async update(req: Request): Promise<Client> {
        const { id } = req.params;
        const body: IClientUpdateRequest = await req.body;
        const newPassword = body.password ? await hash(body.password, 8) : null;
        if (newPassword) {
            await clientRepo.update(id, {
                ...body,
                password: newPassword ?? body.password,
            });
        } else {
            await clientRepo.update(id, body);
        }
        return await this.findUserById(id);
    },
    async delete(req: Request): Promise<UpdateResult> {
        const { id } = req.params;
        return await clientRepo.update(id, {
            is_active: false,
        });
    },
};
