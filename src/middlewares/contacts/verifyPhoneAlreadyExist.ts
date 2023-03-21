import { contactRepo } from "./../../repositories/contact-repo";
import { Request, Response, NextFunction } from "express";
import { AppError } from "../../errors/app-error";

export const verifyPhoneAlreadyExist = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const phoneAlreadyExist = await contactRepo.findOne({
        where: {
            phone: req.body.phone,
        },
    });
    if (phoneAlreadyExist) {
        throw new AppError("Phone Already Exist", 400);
    }
    return next();
};
