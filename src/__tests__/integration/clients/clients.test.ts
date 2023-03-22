import { IClientCreateResponse } from "./../../../interfaces/clients";
import { AppDataSource } from "../../../data-source";
import * as M from "../../mocks/clients";
import { DataSource } from "typeorm";
import { app } from "../../../app";
import request from "supertest";

describe("Clients Tests", () => {
    let connection: DataSource;
    let clientCreated = {} as IClientCreateResponse;
    let token: string;

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

    test("POST /clients - Should be able to create a client", async () => {
        const response = await request(app)
            .post("/clients")
            .send(M.MockedClientValid);

        clientCreated = response.body;

        expect(response.body).toHaveProperty("id");
        expect(response.body).toHaveProperty("name");
        expect(response.body).toHaveProperty("email");
        expect(response.body).toHaveProperty("phone");
        expect(response.body).toHaveProperty("registered_date");
        expect(response.body).toHaveProperty("is_active");
        expect(response.body).toHaveProperty("contacts");
    });

    test("POST /clients - Should not be able to create a client with invalid body", async () => {
        const response = await request(app)
            .post("/clients")
            .send(M.MockedClientInvalid);

        expect(response.body).toStrictEqual({
            message: ["email must be a valid email"],
        });
    });

    test("GET /clients/:id -  should be able to get owner user", async () => {
        const loginBody = await request(app)
            .post("/clients/login")
            .send(M.MockedClientValid);

        token = loginBody.body.token;

        const clientLoggedToReturn = await request(app)
            .get(`/clients/${clientCreated.id}`)
            .set("Authorization", `Bearer ${token}`);

        expect(clientLoggedToReturn.body).toHaveProperty("id");
        expect(clientLoggedToReturn.body).toHaveProperty("name");
        expect(clientLoggedToReturn.body).toHaveProperty("email");
        expect(clientLoggedToReturn.body).toHaveProperty("phone");
        expect(clientLoggedToReturn.body).toHaveProperty("registered_date");
        expect(clientLoggedToReturn.body).toHaveProperty("is_active");
        expect(clientLoggedToReturn.body).toHaveProperty("contacts");
    });

    test("GET /clients/:id -  should not be able to get other user", async () => {
        const otherUser = await request(app)
            .post("/clients")
            .send(M.MockedOtherClientValid);

        const response = await request(app)
            .get(`/clients/${otherUser.body.id}`)
            .set("Authorization", `Bearer ${token}`);

        expect(response.body).toHaveProperty("message");
        expect(response.status).toBe(400);
    });

    test("PATCH /clients/:id -  should be able to update owner user", async () => {
        const response = await request(app)
            .patch(`/clients/${clientCreated.id}`)
            .set("Authorization", `Bearer ${token}`)
            .send({
                name: "TESTE",
            });

        expect(response.body).toHaveProperty("name");
        expect(response.body.name).toBe("TESTE");
    });

    test("DELETE /clients/:id -  should be able to delete owner user, change your is_activate to false", async () => {
        const response = await request(app)
            .delete(`/clients/${clientCreated.id}`)
            .set("Authorization", `Bearer ${token}`);

        expect(response.status).toBe(204);
    });
});
