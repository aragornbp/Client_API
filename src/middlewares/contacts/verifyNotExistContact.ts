import { contactRepo } from "./../../repositories/contact-repo";
import { Request, Response, NextFunction } from "express";
import { AppError } from "../../errors/app-error";

export const verifyNotExistContact = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const existContact = await contactRepo.findOne({
        where: {
            email: req.body.email,
        },
    });
    if (!existContact) {
        throw new AppError("Contact Not Found");
    }
    req.contactFound = existContact;
    return next();
};
