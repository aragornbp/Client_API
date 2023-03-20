import { clientRepo } from "../../repositories/client-repo";
import { Request, Response, NextFunction } from "express";
import { AppError } from "../../errors/app-error";

export const verifyAlreadyExistClient = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const userAlreadyExist = await clientRepo.findOne({
        where: {
            email: req.body.email,
        },
    });
    if (userAlreadyExist) {
        throw new AppError("User Already Exist", 400);
    }
    return next();
};
