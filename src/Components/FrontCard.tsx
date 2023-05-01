import { Box, Typography } from "@mui/material";
import "./FrontCard.scss";
import CardLogo from "../assets/card-logo.svg";
import { padStr, formatCardNumber, zeroPad } from "../utils";

interface IFrontCardProps {
  className?: string;
  cardNumber?: string;
  name?: string;
  namePlaceholder?: string;
  expDate?: { month: number; year: number };
}

const FrontCard: React.FC<IFrontCardProps> = ({
  className,
  cardNumber,
  name,
  namePlaceholder,
  expDate,
}) => {
  const { month, year } = expDate ?? {};

  const pad = (value?: number) => zeroPad(value, 2);

  return (
    <Box id="FrontCard" className={className}>
      <img className="img-logo" src={CardLogo} />
      <Typography className="card-number">
        {formatCardNumber(cardNumber)}
      </Typography>

      <Box className="card-details">
        <Typography className="name">{name ?? namePlaceholder}</Typography>
        <Typography className="exp-date">
          {pad(month)}/{pad(year)}
        </Typography>
      </Box>
    </Box>
  );
};

export default FrontCard;
