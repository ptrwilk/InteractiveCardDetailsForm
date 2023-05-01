import React from "react";
import { IInputFieldProps, InputField } from "./InputField";

const NumericInputField: React.FC<IInputFieldProps> = (props) => {
  const { onValueChange } = props;

  const handleValueChange = (text?: any) => {
    if (text === undefined || /^[0-9\b]+$/.test(text!)) {
      onValueChange?.(text ? Number(text) : undefined);
    }
  };

  return <InputField {...props} onValueChange={handleValueChange} />;
};

export { NumericInputField };
