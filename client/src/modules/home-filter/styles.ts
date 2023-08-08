import { TextField, TextFieldProps, styled } from "@mui/material";

export const StyledTextField = styled(TextField)<TextFieldProps>(() => ({
  "& .MuiInputBase-input": {
    borderRadius: 10,
    position: "relative",
    backgroundColor: "white",
    //   border: "1px solid #ced4da",
    fontSize: 16,
    width: "auto",
    //   padding: "10px 12px",
    height: "6px",
    color: "black",
  },
}));
