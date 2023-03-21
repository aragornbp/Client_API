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
            id: req.params.id,
        },
    });
    const isActive = contactIsActive?.is_active;
    if (!isActive) {
        throw new AppError("Contact Not Exist", 400);
    }
    return next();
};
