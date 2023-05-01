import { Box, Button, useMediaQuery } from "@mui/material";
import "./InteractiveCardDetailsFormPage.scss";
import BgMainMobile from "../assets/bg-main-mobile.png";
import BgMainDesktop from "../assets/bg-main-desktop.png";
import FrontCard from "../Components/FrontCard";
import BackCard from "../Components/BackCard";
import { useInputField } from "../useInputField";
import { isNumber } from "../utils";
import {
  InputField,
  NumericInputField,
  GroupInputField,
} from "../Components/InputField";
import { useState } from "react";
import Complete from "../Components/Complete";

type Validation = {
  isValid: boolean;
  errorMessage: string;
};

type Validator = {
  validate: (value?: any) => Validation;
};

const createValidator = (
  validate: (value?: any) => boolean,
  errorMessage: string
): Validator => {
  return {
    validate: (value?: any) => ({
      isValid: validate(value),
      errorMessage: errorMessage,
    }),
  };
};

const validate = (inputField: any, validators: Validator[]): boolean => {
  let hasError = false;

  for (var validator of validators) {
    const { isValid, errorMessage } = validator.validate(inputField.value);

    if (!isValid) {
      hasError = true;
      inputField.setError(errorMessage);
      break;
    }
  }

  if (!hasError) {
    inputField.setError(undefined);
  }

  return hasError;
};

const InteractiveCardDetailsFormPage = () => {
  const name = useInputField();
  const cardNumber = useInputField();
  const expMonth = useInputField();
  const expYear = useInputField();
  const cvc = useInputField();
  const [complete, setComplete] = useState(false);

  const isLarge = useMediaQuery("(min-width: 1045px)");

  const emptyValidator = createValidator(
    (value?: any) => !!value,
    "Can't be blank"
  );

  const confirm = () => {
    const validators: { inputField: any; validators: Validator[] }[] = [
      { inputField: name, validators: [emptyValidator] },
      {
        inputField: cardNumber,
        validators: [
          emptyValidator,
          createValidator(isNumber, "Wrong format, numbers only"),
          createValidator(
            (value?: any) => value!.length === 16,
            "Must be exactly 16 digits"
          ),
        ],
      },
      { inputField: expMonth, validators: [emptyValidator] },
      { inputField: expYear, validators: [emptyValidator] },
      { inputField: cvc, validators: [emptyValidator] },
    ];

    let errors = [];

    for (var validator of validators) {
      const hasError = validate(validator.inputField, validator.validators);

      if (hasError) {
        errors.push(hasError);
      }
    }

    if (errors.length === 0) {
      setComplete(true);
    }
  };

  return (
    <Box id="InteractiveCardDetailsFormPage">
      <Box className="section-bg">
        <img className="img-bg" src={isLarge ? BgMainDesktop : BgMainMobile} />
        <BackCard className="back-card" cvc={cvc.value} />
        <FrontCard
          className="front-card"
          name={name.value}
          namePlaceholder="Jane Appleseed"
          cardNumber={cardNumber.value}
          expDate={{ month: expMonth.value, year: expYear.value }}
        />
      </Box>
      {!complete && (
        <form
          className="form"
          onSubmit={(e) => {
            e.preventDefault();

            confirm();
          }}
        >
          <InputField
            placeholder="e.g. Jane Appleseed"
            caption="cardholder name"
            maxLength={20}
            {...name}
          />
          <InputField
            placeholder="e.g. 1234 5678 9123 0000"
            caption="card number"
            maxLength={16}
            {...cardNumber}
          />
          <Box className="exp-cvc">
            <GroupInputField caption="exp. date (mm/yy)">
              <NumericInputField placeholder="MM" maxLength={2} {...expMonth} />
              <NumericInputField placeholder="YY" maxLength={2} {...expYear} />
            </GroupInputField>
            <NumericInputField
              caption="cvc"
              placeholder="e.g. 123"
              maxLength={3}
              {...cvc}
            />
          </Box>
          <Button className="btn" type="submit">
            Confirm
          </Button>
        </form>
      )}
      {complete && (
        <Complete className="complete" onContinue={() => setComplete(false)} />
      )}
    </Box>
  );
};

export default InteractiveCardDetailsFormPage;
