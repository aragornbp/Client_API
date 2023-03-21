import { AppDataSource } from "../../../data-source";
import { DataSource } from "typeorm";
import { app } from "../../../app";
import request from "supertest";

describe("Clients Tests", () => {
    let connection: DataSource;
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

    it("POST /clients - Should be able to create a client", async () => {
        const response = await request(app).post("/clients/register").send({
            name: "teste",
            email: "teste@gmail.com",
            phone: 1234565456,
            password: "5464",
        });

        console.dir(response.body, { depth: null });
        expect(response.body).toBeTruthy();
    });
});
