import * as yup from "yup";

export const registerClientSchema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required(),
    phone: yup.number().min(11).required(),
});

export const loginClientSchema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
});

export const updateClientSchema = yup.object().shape({
    name: yup.string().notRequired(),
    email: yup.string().email().notRequired(),
    password: yup.string().notRequired(),
    phone: yup.number().notRequired(),
    is_active: yup.boolean().notRequired(),
});
