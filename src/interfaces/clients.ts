import { Contact } from "../entities/Contact";

export interface IClientCreateRequest {
    name: string;
    email: string;
    password: string;
    phone: number;
}

export interface IClientUpdateRequest {
    name?: string;
    email?: string;
    password?: string;
    phone?: number;
    is_active?: boolean;
}

export interface IRegisterRequest {
    name: string;
    email: string;
    password: string;
    phone: number;
}

export interface ILoginRequest {
    email: string;
    password: string;
}
