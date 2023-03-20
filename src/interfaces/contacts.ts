import { Client } from "./../entities/Client";

export interface IContactCreateRequest {
    name: string;
    email: string;
    phone: number;
    client: Client;
}

export interface IContactUpdateRequest {
    name?: string;
    email?: string;
    phone?: number;
    is_active?: boolean;
}
