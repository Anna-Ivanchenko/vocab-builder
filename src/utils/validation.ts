import * as yup from "yup";

const EMAIL_REGEX = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
const PASSWORD_REGEX = /^(?=.*[a-zA-Z]{6})(?=.*\d)[a-zA-Z\d]{7}$/;

const email = yup
  .string()
  .trim()
  .required("Email is required")
  .matches(EMAIL_REGEX, "Enter a valid email, e.g. name@mail.com");

const password = yup
  .string()
  .required("Password is required")
  .matches(PASSWORD_REGEX, "Password must be 6 English letters and 1 number");

export const registerSchema = yup.object({
  name: yup.string().trim().required("Name is required"),
  email,
  password,
});

export const loginSchema = yup.object({
  email,
  password,
});