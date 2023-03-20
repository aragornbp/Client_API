import { HandlerError } from "./errors/handler-error";
import { routes } from "./routes/_index.routes";
import express from "express";
import "reflect-metadata";
import "express-async-errors";

export const app = express();

app.use(express.json());
app.use(routes);
app.use(HandlerError);
