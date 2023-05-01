import { Box, Typography } from "@mui/material";
import "./BackCard.scss";
import { zeroPad } from "../utils";

interface IBackCardProps {
  className?: string;
  cvc?: number;
}

const BackCard: React.FC<IBackCardProps> = ({ className, cvc }) => {
  return (
    <Box id="BackCard" className={className}>
      <Typography className="cvc">{zeroPad(cvc, 3)}</Typography>
    </Box>
  );
};

export default BackCard;
