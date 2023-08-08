import {
  Select,
  SelectProps,
  styled,
  MenuItem,
  MenuItemProps,
} from "@mui/material";

export const StyledSelect = styled(Select)<SelectProps>(({ theme }) => ({
  borderRadius: "5px",
  width: 125,
  height: 38,
  background: "white",
  color: "black",
  fontSize: 12,
  fontWeight: 700,
  fontFamily: "Heebo",
  [theme.breakpoints.down("sm")]: {
    width: 90,
  },
}));

export const StyledOption = styled(MenuItem)<MenuItemProps>(({ selected }) => ({
  color: "black",
  fontSize: 16,
  width: "158px",
  height: "40px",
  fontWeight: 700,
  ":hover": {
    background: "grey",
  },
  background: selected ? "#FF6063 !important" : "white",
  fontFamily: "Heebo",
}));
