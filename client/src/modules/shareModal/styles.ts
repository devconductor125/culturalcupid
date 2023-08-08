import styled from "@emotion/styled";
import { Box, TextField, TextFieldProps } from "@mui/material";
import Rectangle from "../../assets/Rectangle.png";

export const ModalContainer = styled(Box)(() => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  background: `url(${Rectangle}) no-repeat`,
  border: "2px solid #000",
  boxShadow: "24px",
  padding: "25px",
  width: "70vw",
  height: "70vh",
  backgroundColor: "white",
}));

export const CommentsTextField = styled(TextField)<TextFieldProps>(() => ({
  fieldset: {
    height: "105px",
  },
}));
