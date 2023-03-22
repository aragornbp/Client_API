import { IContactCreateResponse } from "../../../interfaces/contacts";
import { IClientCreateResponse } from "../../../interfaces/clients";
import { MockedClientValid } from "../../mocks/clients";
import { AppDataSource } from "../../../data-source";
import * as M from "../../mocks/contacts";
import { DataSource } from "typeorm";
import { app } from "../../../app";
import request from "supertest";

describe("contacts Tests", () => {
    let connection: DataSource;
    let contactCreated = {} as IContactCreateResponse;
    let clientCreated = {} as IClientCreateResponse;
    let token: string = "";

    beforeAll(async () => {
        await AppDataSource.initialize()
            .then((res) => {
                connection = res;
            })
            .catch((err) => {
                console.error("Error during Data Source initialization", err);
            });
    });

    afterAll(async () => {
        await connection.destroy();
    });

    test("POST /contacts - Should be able to create a contact", async () => {
        const response = await request(app)
            .post("/clients")
            .send(MockedClientValid);

        clientCreated = response.body;

        const login = await request(app)
            .post("/clients/login")
            .send(MockedClientValid);

        token = login.body.token;

        const responseContact = await request(app)
            .post("/contacts")
            .set("Authorization", `Bearer ${token}`)
            .send(M.MockedContactValid);

        contactCreated = responseContact.body;

        expect(responseContact.body).toHaveProperty("id");
        expect(responseContact.body).toHaveProperty("name");
        expect(responseContact.body).toHaveProperty("email");
        expect(responseContact.body).toHaveProperty("phone");
        expect(responseContact.body).toHaveProperty("registered_date");
        expect(responseContact.body).toHaveProperty("is_active");
        expect(responseContact.body).toHaveProperty("client");
    });

    test("POST /contacts - Should not be able to create a contact with invalid body", async () => {
        const response = await request(app)
            .post("/contacts")
            .set("Authorization", `Bearer ${token}`)
            .send(M.MockedContactInvalid);

        expect(response.body).toStrictEqual({
            message: ["email must be a valid email"],
        });
    });

    // test("GET /contacts/:id -  should be able to get owner user", async () => {
    //     const loginBody = await request(app)
    //         .post("/contacts/login")
    //         .send(M.MockedContactValid);

    //     const token = loginBody.body.token;

    //     const clientLoggedToReturn = await request(app)
    //         .get(`/contacts/${contactCreated.id}`)
    //         .set("Authorization", `Bearer ${token}`);

    //     expect(clientLoggedToReturn.body).toHaveProperty("id");
    //     expect(clientLoggedToReturn.body).toHaveProperty("name");
    //     expect(clientLoggedToReturn.body).toHaveProperty("email");
    //     expect(clientLoggedToReturn.body).toHaveProperty("phone");
    //     expect(clientLoggedToReturn.body).toHaveProperty("registered_date");
    //     expect(clientLoggedToReturn.body).toHaveProperty("is_active");
    //     expect(clientLoggedToReturn.body).toHaveProperty("contacts");
    // });

    // test("GET /contacts/:id -  should not be able to get other user", async () => {
    //     const otherUser = await request(app)
    //         .post("/contacts")
    //         .send(M.MockedOtherContactInvalid);

    //     const loginBody = await request(app)
    //         .post("/contacts/login")
    //         .send(M.MockedContactValid);

    //     const token = loginBody.body.token;

    //     const response = await request(app)
    //         .get(`/contacts/${otherUser.body.id}`)
    //         .set("Authorization", `Bearer ${token}`);

    //     expect(response.body).toHaveProperty("message");
    //     expect(response.status).toBe(400);
    // });

    // test("PATCH /contacts/:id -  should be able to update owner user", async () => {
    //     const loginBody = await request(app)
    //         .post("/contacts/login")
    //         .send(M.MockedContactValid);

    //     const token = loginBody.body.token;

    //     const response = await request(app)
    //         .patch(`/contacts/${contactCreated.id}`)
    //         .set("Authorization", `Bearer ${token}`)
    //         .send({
    //             name: "TESTE",
    //         });

    //     expect(response.body).toHaveProperty("name");
    //     expect(response.body.name).toBe("TESTE");
    // });

    // test("DELETE /contacts/:id -  should be able to delete owner user, change your is_activate to false", async () => {
    //     const loginBody = await request(app)
    //         .post("/contacts/login")
    //         .send(M.MockedContactValid);

    //     const token = loginBody.body.token;

    //     const response = await request(app)
    //         .delete(`/contacts/${contactCreated.id}`)
    //         .set("Authorization", `Bearer ${token}`);

    //     expect(response.status).toBe(204);
    // });
});
