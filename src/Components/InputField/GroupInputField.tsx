import { Box, Typography } from "@mui/material";
import "./GroupInputField.scss";
import React, { useCallback, useEffect, useMemo, useState } from "react";

interface IGroupInputFieldProps {
  children?: any;
  caption?: string;
}

const GroupInputField: React.FC<IGroupInputFieldProps> = ({
  children,
  caption,
}) => {
  const props = children.map((child: any) => child.props);

  useEffect(() => {}, [props]);

  const hasError = props.some((prop: any) => prop.error);
  const errorMessages = props
    .map((prop: any) => prop.errorMessage)
    .filter((errorMessage: any) => errorMessage);

  const clones = React.Children.map(children, (child, index) => {
    return React.cloneElement(child, {
      ...child.props,
      errorMessage: undefined,
    });
  });

  return (
    <Box id="GroupInputField">
      <Typography className="caption">{caption}</Typography>
      <Box className="items">{clones}</Box>
      {hasError && (
        <Typography className="error">{errorMessages[0]}</Typography>
      )}
    </Box>
  );
};

export { GroupInputField };
