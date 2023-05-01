import { Box, Button, Typography } from "@mui/material";
import "./Complete.scss";
import IconComplete from "../assets/icon-complete.svg";

interface ICompleteProps {
  className?: string;
  onContinue?: () => void;
}

const Complete: React.FC<ICompleteProps> = ({ className, onContinue }) => {
  return (
    <Box id="Complete" className={className}>
      <img src={IconComplete} />
      <Typography className="title">Thank you!</Typography>
      <Typography className="text">We've added your card details</Typography>
      <Button className="btn" onClick={onContinue}>
        Continue
      </Button>
    </Box>
  );
};

export default Complete;
