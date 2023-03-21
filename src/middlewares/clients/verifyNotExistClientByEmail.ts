import { clientRepo } from "../../repositories/client-repo";
import { Request, Response, NextFunction } from "express";
import { AppError } from "../../errors/app-error";

export const verifyNotExistClientByEmail = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const existClient = await clientRepo.findOne({
        where: {
            email: req.body.email,
        },
        select: ["id", "email", "password"],
    });
    if (!existClient) {
        throw new AppError("Client Not Found");
    }
    req.clientFound = existClient;
    return next();
};
