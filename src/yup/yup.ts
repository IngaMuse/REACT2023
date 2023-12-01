import { object, string, number, boolean, ref } from "yup";

export const schema = object({
  name: string()
    .required("This is a required field")
    .strict(true)
    .uppercase("First names letter must be a capital letter"),
  age: number()
    .required("This is a required field")
    .integer("Age must be a number")
    .positive("Age must be no negative number"),
  email: string()
    .required("This is a required field")
    .email("Email is not valid"),
  password: string()
    .required("This is a required field")
    .matches(/^(?=.*[0-9])/, "Must contain one number")
    .matches(/^(?=.*[A-ZА-Я])/, "Must contain one uppercased letter")
    .matches(/^(?=.*[a-zа-я])/, "Must contain one lowercased letter")
    .matches(/^(?=.*[!@#%&$^*()?><|+=])/, "Must contain one special character"),
  passwordConfirm: string()
    .required("This is a required field")
    .oneOf([ref("password")], "Passwords must match"),
  accept: boolean().oneOf([true], "You must accept T&C"),
  image: object({
    size: number()
      .required("This is a required field")
      .max(200000, "The size must be no more 200 kB"),
    type: string()
      .required("This is a required field")
      .oneOf(["image/png", "image/jpeg"], "Format must be PNG or JPEG"),
  }),
  country: string().required("This is a required field"),
});
