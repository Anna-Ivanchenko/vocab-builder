import * as yup from "yup";

const EMAIL_REGEX = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
const PASSWORD_REGEX = /^(?=.*[a-zA-Z]{6})(?=.*\d)[a-zA-Z\d]{7}$/;
const EN_REGEX = /^[A-Za-z'-]+(?:\s+[A-Za-z'-]+)*$/;
const UA_REGEX = /^(?![A-Za-z])[А-ЯІЄЇҐґа-яієїʼ\s]+$/u;

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

const en = yup
  .string()
  .trim()
  .required("English word is required")
  .matches(EN_REGEX, "Use English letters only");

const ua = yup
  .string()
  .trim()
  .required("Translation is required")
  .matches(UA_REGEX, "Use Ukrainian letters only");

export const editWordSchema = yup.object({
  en,
  ua,
});

export const addWordSchema = yup.object({
  category: yup.string().required("Choose a category"),
  isIrregular: yup.boolean().required(),
  en,
  ua,
});