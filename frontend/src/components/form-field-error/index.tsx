import { FC } from "react";
import { FieldError } from "react-hook-form";

const FormFieldError: FC<{ fieldError?: FieldError }> = ({ fieldError }) =>
  fieldError && (
    <span className="text-small text-red-500">{fieldError.message}</span>
  );

export default FormFieldError;
