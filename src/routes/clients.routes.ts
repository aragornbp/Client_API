import { verifyAlreadyExistClient } from "../middlewares/clients/verifyAlreadyExistClient";
import { verifyNotExistClient } from "./../middlewares/clients/verifyNotExistClient";
import { verifyClientIsLogged } from "./../middlewares/clients/verifyClientIsLogged";
import {
    loginClientSchema,
    registerClientSchema,
    updateClientSchema,
} from "./../schemas/clients";
import { validateSchema } from "../middlewares/validators/validateSchema";
import { ClientController } from "../controllers/client.controller";
import { Router } from "express";

export const clientRoutes = Router();

clientRoutes.post(
    "/login",
    validateSchema(loginClientSchema),
    verifyNotExistClient,
    ClientController.login
);

clientRoutes.post(
    "/register",
    validateSchema(registerClientSchema),
    verifyAlreadyExistClient,
    ClientController.create
);

// clientRoutes.get("/", ClientController.getAll);

clientRoutes.patch(
    "/:id",
    validateSchema(updateClientSchema),
    verifyClientIsLogged,
    verifyNotExistClient,
    ClientController.update
);

clientRoutes.get(
    "/:id",
    verifyClientIsLogged,
    verifyNotExistClient,
    ClientController.getById
);

clientRoutes.delete(
    "/:id",
    verifyClientIsLogged,
    verifyNotExistClient,
    ClientController.delete
);
