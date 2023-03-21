import { clientRepo } from "../../repositories/client-repo";
import { Request, Response, NextFunction } from "express";
import { AppError } from "../../errors/app-error";

export const verifyNotExistClientById = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const existClient = await clientRepo.findOne({
        where: {
            id: req.params.id,
        },
    });
    if (!existClient) {
        throw new AppError("Client Not Found");
    }
    req.clientFound = existClient;
    return next();
};
