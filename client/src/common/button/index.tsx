import { Box, ButtonProps } from "@mui/material";
import { ButtonStyles, ButtonLabel } from "./styles";
import Arrow from "../../assets/icons/arrow.svg";

interface StyledButtonProps extends ButtonProps {
  label?: any;
}

const StyledButton = ({ label, onClick }: StyledButtonProps) => {
  return (
    <ButtonStyles variant="contained" onClick={onClick}>
      <Box sx={{ display: "flex" }}>
        <ButtonLabel>{label}</ButtonLabel>
      </Box>
      <Box sx={{ paddingTop: "8px", paddingLeft: "10px" }}>
        <img src={Arrow} alt="Arrow" />
      </Box>
      <Box sx={{ paddingTop: "8px", paddingLeft: "2px" }}>
        <img src={Arrow} alt="Arrow" />
      </Box>
    </ButtonStyles>
  );
};

export default StyledButton;
