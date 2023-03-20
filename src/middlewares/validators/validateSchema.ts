import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "yup";

export const validateSchema =
    (serializer: ObjectSchema<any>) =>
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const validated = await serializer.validate(req.body, {
                stripUnknown: true,
                abortEarly: false,
            });
            req.body = validated;
            next();
        } catch (error: any) {
            return res.status(400).json({ message: error.errors });
        }
    };
