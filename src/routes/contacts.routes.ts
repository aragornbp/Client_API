import { verifyClientIsLogged } from "./../middlewares/clients/verifyClientIsLogged";
import { validateSchema } from "./../middlewares/validators/validateSchema";
import { ContactController } from "./../controllers/contact.controller";
import { createContactSchema } from "../schemas/contacts";
import { Router } from "express";
import { verifyIsContactActive } from "../middlewares/contacts/verifyIsContactActive";
import { verifyNotExistContactById } from "../middlewares/contacts/verifyNotExistContactById";
import { verifyAlreadyExistContact } from "../middlewares/contacts/verifyAlreadyExistContact";
import { verifyClientIsSameClientLoggedById } from "../middlewares/clients/verifyClientIsSameClientLoggedById";
import { verifyPhoneAlreadyExist } from "../middlewares/contacts/verifyPhoneAlreadyExist";

export const contactRoutes = Router();

contactRoutes.get("/", ContactController.getAll);

contactRoutes.post(
    "/",
    validateSchema(createContactSchema),
    verifyClientIsLogged,
    verifyAlreadyExistContact,
    verifyPhoneAlreadyExist,
    ContactController.create
);

contactRoutes.get(
    "/:id",
    verifyClientIsLogged,
    verifyNotExistContactById,
    verifyIsContactActive,
    ContactController.getById
);

contactRoutes.patch(
    "/:id",
    verifyClientIsLogged,
    verifyNotExistContactById,
    ContactController.update
);

contactRoutes.delete(
    "/:id",
    verifyClientIsLogged,
    verifyNotExistContactById,
    ContactController.delete
);
