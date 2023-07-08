import React from "react";
import { useFormikContext } from "formik";

import ErrorMessage from "./ErrorMessage";
import ImageInput from "../ImageInput";

function FormImagePicker({ name }) {
  const { errors, setFieldValue, touched, values } = useFormikContext();
  const imageUri = values[name];

  const handleAdd = (uri) => {
    setFieldValue(name, uri);
  };

  return (
    <>
      {/* <ImageInputList
        imageUri={imageUri}
        onAddImage={handleAdd}
        onRemoveImage={handleRemove}
      /> */}
      <ImageInput imageUri={imageUri} onChangeImage={(uri) => handleAdd(uri)} />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}

export default FormImagePicker;
