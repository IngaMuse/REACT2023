import { object, string, number, boolean, ref, mixed } from "yup";
import { setupStore } from "../store/store";
const store = setupStore();

const countries = store.getState().country.countries;
const MAX_FILE_SIZE = 204800;

export const schema = object({
  id: number(),
  name: string()
    .required("This is a required field")
    .strict(true)
    .matches(/^(?=.*[A-ZА-Я])/, "Name must begin with an uppercase letter"),
  age: number()
    .typeError("Age must be a number")
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
  gender: string()
    .required("This is a required field")
    .oneOf(["male", "female"], "You must chose gender"),
  accept: boolean().oneOf([true], "You must accept T&C"),
  image: mixed<FileList>()
    .test("required", "This is a required field", (files) => {
      if (!files || !files[0]) return false;
      return files?.length == 1;
    })
    .test("is-valid-type", "Not a valid image type", (files) => {
      if (!files || !files[0]) return false;
      return files[0].type === "image/jpeg" || files[0].type === "image/png";
    })
    .test("is-valid-size", "Max allowed size is 200KB", (files) => {
      if (!files || !files[0]) return false;
      return files[0].size <= MAX_FILE_SIZE;
    }),
  country: string()
    .required("This is a required field")
    .test(
      "includes in stores countries",
      "Chose country from countries list",
      (value) => {
        return countries
          .map((el) => el.toLowerCase())
          .includes(value.toLowerCase());
      },
    ),
});

export const passwordSchema = object({
  password: string()
    .required("This is a required field")
    .matches(/^(?=.*[0-9])/, "Must contain one number")
    .matches(/^(?=.*[A-ZА-Я])/, "Must contain one uppercased letter")
    .matches(/^(?=.*[a-zа-я])/, "Must contain one lowercased letter")
    .matches(/^(?=.*[!@#%&$^*()?><|+=])/, "Must contain one special character"),
});
