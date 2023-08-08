import { Button, ButtonProps, styled } from "@mui/material";

export const EnterEmail = styled(Button)<ButtonProps>(() => ({
  width: "244px",
  height: "35px",
  background: "#FF6063",
  justifyContent: "left",
  fontWeight: 700,
  fontSize: "13px",
  color: "white",
  ":hover": {
    background: "#FF6063",
  },
}));

export const SendEmailIcon = styled("div")`
  background: white;
  width: 50px;
  border: 1px solid black;
  align-items: center;
  display: flex;
  justify-content: center;
`;
