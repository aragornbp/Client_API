import { verifyClientIsSameClientLoggedById } from "../middlewares/clients/verifyClientIsSameClientLoggedById";
import { verifyNotExistContactById } from "../middlewares/contacts/verifyNotExistContactById";
import { verifyAlreadyExistContact } from "../middlewares/contacts/verifyAlreadyExistContact";
import { verifyPhoneAlreadyExist } from "../middlewares/contacts/verifyPhoneAlreadyExist";
import { verifyIsContactActive } from "../middlewares/contacts/verifyIsContactActive";
import { verifyClientIsLogged } from "./../middlewares/clients/verifyClientIsLogged";
import { validateSchema } from "./../middlewares/validators/validateSchema";
import { ContactController } from "./../controllers/contact.controller";
import { createContactSchema } from "../schemas/contacts";
import { Router } from "express";

export const contactRoutes = Router();

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
