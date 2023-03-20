import * as yup from "yup";

export const createContact = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
    phone: yup.number().required(),
});
