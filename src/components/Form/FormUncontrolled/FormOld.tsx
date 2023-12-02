import React, { useRef, useState } from "react";
import { useActions, useAppSelector } from "../../../hooks/redux";
import "../styles.css";
import { passwordSchema, schema } from "../../../yup/yup";
import { ValidationError } from "yup";
import InputFile from "./InputFile";
import AutocompleteCountry from "./AutocompleteCountry";
import { ICard } from "../../../types/form.types";
import { useNavigate } from "react-router";
import { convertToBase64 } from "./convertImageToBase64";

const FormOld = () => {
  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordConfirmRef = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLInputElement>(null);
  const acceptRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLInputElement>(null);

  const { removeValidationError } = useActions();
  const { setValidationError } = useActions();
  const { setCreatedForm } = useActions();

  const nameError = useAppSelector((state) => state.error.name);
  const ageError = useAppSelector((state) => state.error.age);
  const emailError = useAppSelector((state) => state.error.email);
  const passwordError = useAppSelector((state) => state.error.password);
  const passwordConfirmError = useAppSelector(
    (state) => state.error.passwordConfirm,
  );
  const genderError = useAppSelector((state) => state.error.gender);
  const acceptError = useAppSelector((state) => state.error.accept);

  const { addCard } = useActions();
  const cards = useAppSelector((state) => state.cards.cards);
  const navigate = useNavigate();
  const maxStrength = 4;
  const [password, setPassword] = useState(maxStrength);

  const handleClick = (event: React.SyntheticEvent) => {
    event.preventDefault();
    handleValidation();
  };

  const handleValidation = async () => {
    removeValidationError();
    try {
      await schema.validate(
        {
          name: nameRef.current?.value[0],
          age: Number(ageRef.current?.value),
          email: emailRef.current?.value,
          password: passwordRef.current?.value,
          passwordConfirm: passwordConfirmRef.current?.value,
          gender: genderRef.current?.value,
          accept: acceptRef.current?.checked,
          image: {
            size: imageRef.current?.files?.["0"]?.size || undefined,
            type: imageRef.current?.files?.["0"]?.type || undefined,
          },
          country: countryRef.current?.value,
        },
        { abortEarly: false },
      );
      setPassword(maxStrength);
      handleSubmit();
    } catch (e: unknown) {
      if (e instanceof ValidationError) {
        setValidationError(e.inner);
      }
    } finally {
      try {
        await passwordSchema.validate(
          {
            password: passwordRef.current?.value,
          },
          { abortEarly: false },
        );
        setPassword(maxStrength);
      } catch (e) {
        if (e instanceof ValidationError) {
          setPassword(maxStrength - e.inner.length);
        }
      }
    }
  };

  const handleSubmit = async () => {
    const base64 =
      imageRef.current && imageRef.current.files
        ? await convertToBase64(imageRef.current.files[0])
        : "";
    const accept = acceptRef.current?.value ? "yes" : "";
    const card: ICard = {
      id: cards.length,
      name: nameRef.current?.value || "",
      age: ageRef.current?.value || "",
      email: emailRef.current?.value || "",
      password: passwordRef.current?.value || "",
      passwordConfirm: passwordConfirmRef.current?.value || "",
      gender: genderRef.current?.value || "",
      accept: accept,
      image: base64 || "",
      country: countryRef.current?.value || "",
    };
    addCard(card);
    setCreatedForm(true);
    navigate("/");
  };

  return (
    <div className="form">
      <h3>Uncontrolled Component</h3>
      <form noValidate>
        <input className="input_box" type="hidden" name="id" value="0" />
        <label>Name: </label>
        <input
          className="input_box"
          type="text"
          name="name"
          placeholder="Enter name"
          ref={nameRef}
        />
        <span className="text_danger">{nameError ? nameError : ""}</span>
        <br />
        <br />
        <label>Age: </label>
        <input
          className="input_box"
          type="number"
          name="age"
          placeholder="Enter age"
          ref={ageRef}
        />
        <span className="text_danger">{ageError ? ageError : ""}</span>
        <br />
        <br />
        <label>E-mail: </label>
        <input
          className="input_box"
          type="email"
          name="email"
          placeholder="Enter e-mail"
          ref={emailRef}
        />
        <span className="text_danger">{emailError ? emailError : ""}</span>
        <br />
        <br />
        <label>Password: </label>
        <input
          className="input_box"
          placeholder="Enter password"
          type="password"
          name="password"
          ref={passwordRef}
        />
        <span className="text_danger">
          {passwordError ? passwordError : ""}
        </span>
        <span>
          {passwordRef.current?.value && password
            ? `Password strength: ${password * 25}%`
            : " "}
        </span>
        <br />
        <br />
        <label>Password confirm: </label>
        <input
          className="input_box"
          placeholder="Enter password again"
          type="password"
          name="password"
          ref={passwordConfirmRef}
        />
        <span className="text_danger">
          {passwordConfirmError ? passwordConfirmError : ""}
        </span>
        <br />
        <br />
        <label>Gender: </label>
        <div className="input_checkbox">
          <label htmlFor="male">Male</label>
          <input
            className="input_box radio"
            type="radio"
            name="gender"
            id="male"
            onChange={() => {
              genderRef.current!.value = "male";
            }}
            ref={genderRef}
          />
          <label htmlFor="female">Female</label>
          <input
            className="input_box radio"
            type="radio"
            name="gender"
            id="female"
            onChange={() => {
              genderRef.current!.value = "female";
            }}
            ref={genderRef}
          />
        </div>
        <span className="text_danger">{genderError ? genderError : ""}</span>
        <br />
        <label>Accept T&C</label>
        <div className="input_checkbox">
          <input
            className="input_box radio"
            type="checkbox"
            name="accept"
            ref={acceptRef}
          />
        </div>
        <span className="text_danger">{acceptError ? acceptError : ""}</span>
        <br />
        <InputFile fileRef={imageRef} />
        <br />
        <br />
        <AutocompleteCountry countryRef={countryRef} />
        <br />
        <br />
        <div className="submit">
          <button className="submit_button" onClick={handleClick}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormOld;
