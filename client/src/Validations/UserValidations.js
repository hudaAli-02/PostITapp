import * as yup from "yup";
export const userSchemaValidation = yup.object().shape({
    name: yup.string().required("Name is required."),
    email: yup.string().email("Not valid email format").required("Email is required"),
    password: yup.string().min(4).max(20).required("password is reqiured"),
    confirmPassword: yup.string().oneOf([yup.ref("password"), null], "password Dont Match ").required(),
});