import { styled, Grid, GridProps } from "@mui/material";

type StyledGridProps = {
  name?: string;
} & GridProps;

export const CategoriesContainer = styled(Grid)<GridProps>(() => ({
  display: "flex",
  padding: 33,
  marginBottom: "150px"
}));

export const CategoryItem = styled(Grid)<StyledGridProps>(() => ({
  cursor: "pointer",
  ":hover": {
    color: "#FF6063",
  },
}));
