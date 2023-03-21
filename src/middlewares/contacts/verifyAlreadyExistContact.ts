import { contactRepo } from "./../../repositories/contact-repo";
import { Request, Response, NextFunction } from "express";
import { AppError } from "../../errors/app-error";

export const verifyAlreadyExistContact = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const contactAlreadyExist = await contactRepo.findOne({
        where: {
            email: req.body.email,
        },
    });
    if (contactAlreadyExist) {
        throw new AppError("Contact Already Exist", 400);
    }
    return next();
};
