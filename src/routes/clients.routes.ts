import { loginClientSchema, registerClientSchema } from "./../schemas/clients";
import { verifyAlreadyExistClient } from "../middlewares/clients/verifyAlreadyExistClient";
import { verifyNotExistClientByEmail } from "../middlewares/clients/verifyNotExistClientByEmail";
import { verifyClientIsSameClientLoggedById } from "./../middlewares/clients/verifyClientIsSameClientLoggedById";
import { verifyNotExistClientById } from "../middlewares/clients/verifyNotExistClientById";
import { validateSchema } from "../middlewares/validators/validateSchema";
import { ClientController } from "../controllers/client.controller";
import { Router } from "express";
import { verifyAlreadyExistContact } from "./../middlewares/contacts/verifyAlreadyExistContact";

export const clientRoutes = Router();

clientRoutes.post(
    "/login",
    validateSchema(loginClientSchema),
    verifyNotExistClientByEmail,
    ClientController.login
);

clientRoutes.post(
    "/",
    validateSchema(registerClientSchema),
    verifyAlreadyExistClient,
    ClientController.create
);

clientRoutes.get("/", ClientController.getAll);

clientRoutes.patch(
    "/:id",
    verifyClientIsSameClientLoggedById,
    verifyNotExistClientById,
    ClientController.update
);

clientRoutes.get(
    "/:id",
    verifyClientIsSameClientLoggedById,
    verifyNotExistClientById,
    ClientController.getById
);

clientRoutes.delete(
    "/:id",
    verifyClientIsSameClientLoggedById,
    verifyNotExistClientById,
    ClientController.delete
);
