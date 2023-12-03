import React from "react";
import { useActions, useAppSelector } from "../../../hooks/redux";
import "../styles.css";
import { useForm } from "react-hook-form";
import { schema } from "../../../yup/yup";
import InputFile from "./InputFile";
import AutocompleteCountry from "./AutocompleteCountryHook";
import { FormValues, ICard } from "../../../types/form.types";
import { useNavigate } from "react-router";
import { convertToBase64 } from "../FormUncontrolled/convertImageToBase64";
import { yupResolver } from "@hookform/resolvers/yup";
import InputPassword from "./InputPassword";

const FormNew = () => {
  const {
    register,
    watch,
    formState: { errors, isValid },
    handleSubmit,
    reset,
    setValue,
    trigger,
  } = useForm<FormValues>({
    mode: "all",
    resolver: yupResolver(schema),
  });

  const { addCard } = useActions();
  const cards = useAppSelector((state) => state.cards.cards);
  const navigate = useNavigate();
  const { setCreatedForm } = useActions();

  const onSubmit = async (data: FormValues) => {
    const base64 = data.image ? await convertToBase64(data.image[0]) : "";
    const accept = data.accept ? "yes" : "";
    const age = data.age.toString();
    const card: ICard = {
      id: cards.length,
      name: data.name,
      age: age,
      email: data.email,
      password: data.password,
      passwordConfirm: data.passwordConfirm,
      gender: data.gender,
      accept: accept,
      image: base64,
      country: data.country,
    };
    addCard(card);
    setCreatedForm(true);
    reset();
    navigate("/");
  };

  return (
    <div className="form">
      <h3>Form Hook Component</h3>
      <form noValidate action="" onSubmit={handleSubmit(onSubmit)}>
        <input type="hidden" {...register("id")} value={cards.length} />
        <label>Name: </label>
        <input
          className="input_box"
          type="text"
          placeholder="Enter name"
          {...register("name")}
        />
        <span className="text_danger">
          {errors.name?.message ? errors.name?.message : ""}
        </span>
        <br />
        <br />
        <label>Age: </label>
        <input
          className="input_box"
          type="number"
          placeholder="Enter age"
          {...register("age")}
        />
        <span className="text_danger">
          {errors.age?.message ? errors.age?.message : ""}
        </span>
        <br />
        <br />
        <label>E-mail: </label>
        <input
          className="input_box"
          type="email"
          placeholder="Enter e-mail"
          {...register("email")}
        />
        <span className="text_danger">
          {errors.email?.message ? errors.email.message : ""}
        </span>
        <br />
        <br />
        <InputPassword
          register={register}
          watchPassword={watch("password")}
          error={{
            errorPassword: errors.password?.message,
            errorPasswordConfirm: errors.passwordConfirm?.message,
          }}
        />
        <br />
        <br />
        <label>Gender: </label>
        <div className="input_checkbox">
          <label htmlFor="male">Male</label>
          <input
            className="input_box radio"
            type="radio"
            id="male"
            {...register("gender")}
            value="male"
          />
          <label htmlFor="female">Female</label>
          <input
            className="input_box radio"
            type="radio"
            id="female"
            {...register("gender")}
            value="female"
          />
        </div>
        <span className="text_danger">
          {errors.gender?.message ? errors.gender.message : ""}
        </span>
        <br />
        <label>Accept T&C</label>
        <div className="input_checkbox">
          <input
            className="input_box radio"
            type="checkbox"
            {...register("accept")}
          />
        </div>
        <span className="text_danger">
          {errors.accept?.message ? errors.accept.message : ""}
        </span>
        <br />
        <InputFile register={register} error={errors.image?.message} />
        <br />
        <br />
        <AutocompleteCountry
          register={register}
          error={errors.country?.message}
          setValue={setValue}
          trigger={trigger}
        />
        <br />
        <br />
        <div className="submit">
          <button className="submit_button" disabled={!isValid}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormNew;
