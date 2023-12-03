import React, { useState } from "react";
import "../styles.css";
import { UseFormRegister } from "react-hook-form";
import { FormValues } from "../../../types/form.types";

interface InputFileProps {
  register: UseFormRegister<FormValues>;
  error: string | undefined;
}

const InputFile = ({ register, error }: InputFileProps) => {
  const [fileName, setFileName] = useState("");
  const handleFile = (file: File) => {
    setFileName(file.name);
    {
      fileName ? <p>Uploaded file: {fileName}</p> : null;
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    const fileUploaded = event.target.files[0];
    handleFile(fileUploaded);
  };

  return (
    <>
      <label htmlFor="image">Image: </label>
      <div className="input__file">
        Click to add image file
        <input
          className="input_checkbox input_image"
          type="file"
          id="image"
          {...register("image")}
          onChange={handleChange}
        />
      </div>
      <span> {fileName ? `Uploaded file: ${fileName}` : " "}</span>
      <span className="text_danger">{error ? error : ""}</span>
    </>
  );
};

export default InputFile;
