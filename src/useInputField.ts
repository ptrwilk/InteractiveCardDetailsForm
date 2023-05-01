import { useState } from "react";

export const useInputField = (): {
  value: any;
  error: boolean;
  errorMessage?: string;
  onValueChange?: (value?: any) => void;
  setError: (message?: string) => void;
} => {
  const [data, setData] = useState<number>();
  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  const handleValueChange = (value?: any) => {
    setData(value);
  };

  const handleSetError = (message?: string) => {
    setErrorMessage(message);
  };

  return {
    value: data,
    error: errorMessage ? true : false,
    errorMessage: errorMessage,
    setError: handleSetError,
    onValueChange: handleValueChange,
  };
};
