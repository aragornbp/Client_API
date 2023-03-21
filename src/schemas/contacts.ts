import * as yup from "yup";

export const createContactSchema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
    phone: yup.number().required(),
});

export const updateContactSchema = yup.object().shape({
    name: yup.string().notRequired(),
    email: yup.string().email().notRequired(),
    phone: yup.number().notRequired(),
    is_active: yup.boolean().notRequired(),
});
