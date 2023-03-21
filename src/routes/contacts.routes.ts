import { verifyNotExistContact } from "./../middlewares/contacts/verifyNotExistContact";
import { verifyClientIsLogged } from "./../middlewares/clients/verifyClientIsLogged";
import { validateSchema } from "./../middlewares/validators/validateSchema";
import { ContactController } from "./../controllers/contact.controller";
import { createContactSchema, updateContactSchema } from "../schemas/contacts";
import { Router } from "express";

export const contactRoutes = Router();

contactRoutes.post(
    "/",
    validateSchema(createContactSchema),
    verifyClientIsLogged,
    ContactController.create
);

contactRoutes.get(
    "/:id",
    verifyClientIsLogged,
    verifyNotExistContact,
    ContactController.getById
);

contactRoutes.patch(
    "/:id",
    validateSchema(updateContactSchema),
    verifyClientIsLogged,
    verifyNotExistContact,
    ContactController.update
);

contactRoutes.delete(
    "/:id",
    verifyClientIsLogged,
    verifyNotExistContact,
    ContactController.delete
);
