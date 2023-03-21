import { contactRepo } from "./../../repositories/contact-repo";
import { Request, Response, NextFunction } from "express";
import { AppError } from "../../errors/app-error";

export const verifyIsContactActive = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const contactIsActive = await contactRepo.findOne({
        where: {
            is_active: true,
        },
    });
    if (contactIsActive) {
        throw new AppError("Contact Not Exist", 400);
    }
    return next();
};
