import { IContactCreateRequest } from "./../../../interfaces/contacts";

export const MockedContactValid: IContactCreateRequest = {
    name: "teste1",
    email: "teste1@gmail.com",
    phone: 123456,
};

export const MockedContactInvalid = {
    name: "teste2",
    email: "teste2",
    password: 1234,
    phone: "123456",
};

export const MockedOtherContactValid: IContactCreateRequest = {
    name: "teste1",
    email: "teste1@gmail.com",
    phone: 123456,
};

export const MockedOtherContactInvalid = {
    name: "teste2",
    email: "teste2",
    password: 1234,
    phone: "123456",
};
