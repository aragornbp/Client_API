import { clientRepo } from "./../repositories/client-repo";
import { ILoginRequest } from "./../interfaces/clients";
import { AppError } from "../errors/app-error";
import { Client } from "./../entities/Client";
import { compare, hash } from "bcryptjs";
import { UpdateResult } from "typeorm";
import { Request } from "express";
import {
    IClientCreateRequest,
    IClientUpdateRequest,
} from "../interfaces/clients";
import jwt from "jsonwebtoken";

export const ClientService = {
    async login(req: Request) {
        const loginData: ILoginRequest = req.body;
        const clientFound = req.clientFound;
        const passwordMatch = await compare(
            loginData.password,
            clientFound.password
        );
        if (!passwordMatch) {
            throw new AppError("Email or password invalid!", 403);
        }
        const secretKey = process.env.SECRET_KEY;
        if (!secretKey) {
            throw new AppError("Missing Secret Key", 403);
        }
        const token = jwt.sign({}, secretKey, {
            subject: clientFound.id,
            expiresIn: "24h",
        });
        return { token };
    },
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
            relations: {
                contacts: true,
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
            relations: {
                contacts: true,
            },
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
        return await this.findUserById(newPerson.id);
    },
    async getById(req: Request): Promise<Client | null> {
        const { id } = req.params;
        return await clientRepo.findOne({
            where: {
                id,
            },
            relations: {
                contacts: true,
            },
        });
    },
    async update(req: Request): Promise<Client> {
        const { id } = req.params;
        const body: IClientUpdateRequest = req.body;
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
