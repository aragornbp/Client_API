import { contactRoutes } from "./contacts.routes";
import { clientRoutes } from "./clients.routes";
import { Router } from "express";

export const routes = Router();

routes.use("/api", contactRoutes);
routes.use("/api", clientRoutes);
