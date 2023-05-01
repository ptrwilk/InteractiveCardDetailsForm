import { Box, Typography, styled } from "@mui/material";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import "./InputField.scss";
import classNames from "classnames";

const errorColor = "hsl(0, 100%, 67%)";

const TextFieldStyled = styled(TextField)<TextFieldProps>(({ error }) => ({
  width: "100%",
  ".MuiOutlinedInput-root": {
    color: "hsl(278, 68%, 11%)",
    "&:hover fieldset": {
      borderColor: error ? errorColor : "hsl(270, 3%, 87%)",
    },
    "&.Mui-focused fieldset": {
      background: error
        ? "transparent"
        : "linear-gradient(white, white) padding-box, linear-gradient(to right, hsl(249, 99%, 64%), hsl(278, 94%, 30%)) border-box",
      border: "1.5px solid transparent",
      zIndex: -1,
    },
    "&.Mui-error fieldset": {
      borderColor: errorColor,
    },
    ".MuiOutlinedInput-notchedOutline": {
      borderColor: "hsl(270, 3%, 87%)",
      borderWidth: 1.5,
      borderRadius: "0.5rem",
    },
    ".MuiOutlinedInput-input": {
      padding: `0.8rem 1rem`,
      fontWeight: 700,
    },
  },
}));

export interface IInputFieldProps {
  className?: string;
  value?: any;
  onValueChange?: (value?: any) => void;
  caption?: string;
  error?: boolean;
  errorMessage?: string;
  placeholder?: string;
  maxLength?: number;
}

const InputField: React.FC<IInputFieldProps> = ({
  className,
  value,
  caption,
  error,
  errorMessage,
  placeholder,
  maxLength = 10,
  onValueChange,
}) => {
  const handleValueChange = (text?: any) => {
    if (text === "") {
      onValueChange?.(undefined);
    } else if ((text?.length ?? 0) <= maxLength) {
      onValueChange?.(text);
    }
  };

  return (
    <Box id="InputField" className={className}>
      {caption && (
        <Typography
          className={classNames("caption", {
            "caption-error": error,
          })}
        >
          {caption}
        </Typography>
      )}
      <TextFieldStyled
        placeholder={placeholder}
        value={value?.toString() ?? ""}
        error={error}
        helperText={error ? errorMessage : undefined}
        FormHelperTextProps={{ sx: { fontSize: 10, marginLeft: 0 } }}
        onChange={(e) => handleValueChange(e.target.value)}
      />
    </Box>
  );
};

export { InputField };
