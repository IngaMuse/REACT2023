import React, { useState } from "react";
import "../styles.css";
import { RefObject } from "react";
import { useAppSelector } from "../../../hooks/redux";

interface InputFileProps {
  fileRef: RefObject<HTMLInputElement>;
}

const InputFile = ({ fileRef }: InputFileProps) => {
  const imageError = useAppSelector((state) => state.error.image);

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
          name="image"
          ref={fileRef}
          onChange={handleChange}
        />
      </div>
      <span> {fileName ? `Uploaded file: ${fileName}` : " "}</span>
      <span className="text_danger">{imageError ? imageError : ""}</span>
    </>
  );
};

export default InputFile;
