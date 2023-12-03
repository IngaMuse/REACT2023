import { useEffect, useState } from "react";
import { FormValues } from "../../../types/form.types";
import { UseFormRegister } from "react-hook-form";
import { passwordSchema } from "../../../yup/yup";
import { ValidationError } from "yup";

interface IPasswordsProps {
  register: UseFormRegister<FormValues>;
  watchPassword: string | undefined;
  error: {
    errorPassword: string | undefined;
    errorPasswordConfirm: string | undefined;
  };
}

const InputPassword = ({
  register,
  watchPassword,
  error: { errorPassword, errorPasswordConfirm },
}: IPasswordsProps) => {
  const [password, setPassword] = useState(0);

  const checkPasswordStrength = async (password: string): Promise<number> => {
    const maxStrength = 4;
    try {
      await passwordSchema.validate(
        {
          password,
        },
        { abortEarly: false },
      );
      return maxStrength;
    } catch (e) {
      if (e instanceof ValidationError) {
        return maxStrength - e.inner.length;
      }
    }
    return 0;
  };

  useEffect(() => {
    if (watchPassword)
      checkPasswordStrength(watchPassword).then((password) => {
        setPassword(password);
      });
  }, [watchPassword]);

  return (
    <>
      <label>Password:</label>
      <input
        type="password"
        className="input_box"
        placeholder="Enter password"
        {...register("password")}
      />
      <span className="text_danger">{errorPassword ? errorPassword : ""}</span>
      <span>{password ? `Password strength: ${password * 25}%` : " "}</span>
      <br />
      <br />
      <label>Password confirm:</label>
      <input
        type="password"
        className="input_box"
        placeholder="Enter password again"
        {...register("passwordConfirm")}
      />
      <span className="text_danger">
        {errorPasswordConfirm ? errorPasswordConfirm : ""}
      </span>
    </>
  );
};
export default InputPassword;
