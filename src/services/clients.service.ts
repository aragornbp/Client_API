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
import "express-async-errors";
import { updateClientSchema } from "./../schemas/clients";

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
    async findClientById(id: string): Promise<Client> {
        const foundClient = await clientRepo.findOne({
            select: [
                "id",
                "name",
                "email",
                "phone",
                "registered_date",
                "is_active",
            ],
            where: {
                id,
            },
            relations: {
                contacts: true,
            },
        });
        if (!foundClient) {
            throw new AppError("Client Not Found", 404);
        }
        return foundClient;
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
            where: {
                is_active: true,
            },
            relations: {
                contacts: true,
            },
        });
    },
    async create(req: Request): Promise<Client> {
        const clientData: IClientCreateRequest = await req.body;
        const passCrypt = await hash(clientData.password, 8);
        const newPerson = clientRepo.create({
            ...clientData,
            password: passCrypt,
        });
        await clientRepo.save(newPerson);
        return await this.findClientById(newPerson.id);
    },
    async getById(req: Request): Promise<Client | null> {
        const { id } = req.params;
        return await clientRepo.findOne({
            select: [
                "id",
                "name",
                "email",
                "is_active",
                "phone",
                "registered_date",
                "contacts",
            ],
            where: {
                id,
            },
            relations: {
                contacts: true,
            },
        });
    },
    async update(req: Request) {
        const { id } = req.params;
        const validatedData = await updateClientSchema.validate(req.body, {
            stripUnknown: true,
        });
        const { email, is_active, name, phone, password } = validatedData;
        if (!email && !is_active && !name && !phone && !password) {
            throw new AppError(
                "Enter at least one field ['email', 'password', 'name', 'is_active', 'phone']",
                400
            );
        }
        const newPassword = validatedData.password
            ? await hash(validatedData.password, 8)
            : null;
        if (newPassword) {
            await clientRepo.update(id, {
                ...validatedData,
                password: newPassword ?? validatedData.password,
            });
        } else {
            await clientRepo.update(id, validatedData);
        }
        return await this.findClientById(id);
    },
    async delete(req: Request): Promise<UpdateResult> {
        const { id } = req.params;
        return await clientRepo.update(id, {
            is_active: false,
        });
    },
};
