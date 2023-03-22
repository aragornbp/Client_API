import { IClientCreateRequest } from "./../../../interfaces/clients";

export const MockedClientValid: IClientCreateRequest = {
    name: "teste1",
    email: "teste1@gmail.com",
    password: "1234",
    phone: 123456,
};

export const MockedClientInvalid = {
    name: "teste2",
    email: "teste2",
    password: 1234,
    phone: "123456",
};

export const MockedOtherClientValid: IClientCreateRequest = {
    name: "teste2",
    email: "teste2@gmail.com",
    password: "1234",
    phone: 123456,
};

export const MockedOtherClientInvalid = {
    name: "teste",
    email: "teste",
    password: 1234,
    phone: "123456",
};
