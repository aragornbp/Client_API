import { clientRepo } from "../../repositories/client-repo";
import { Request, Response, NextFunction } from "express";
import { AppError } from "../../errors/app-error";
import jwt from "jsonwebtoken";

export const verifyClientIsSameClientLoggedById = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const authToken = req.headers.authorization;
    if (!authToken) {
        throw new AppError("Missing authorization headers", 401);
    }
    const token = authToken.split(" ")[1];
    const secretKey = process.env.SECRET_KEY;
    if (!secretKey) {
        throw new AppError("Missing Secret Key", 403);
    }
    return jwt.verify(token, secretKey, async (error, decoded: any) => {
        if (error) {
            throw new AppError("Invalid token", 401);
        }
        const id = String(decoded.sub);
        const clientFound = await clientRepo.findOneBy({ id });
        if (!clientFound) {
            throw new AppError("User Not Found", 404);
        }
        if (req.params.id !== clientFound.id) {
            throw new AppError("User can`t update other user");
        }
        req.clientFound = clientFound;
        return next();
    });
};
