import axios from "axios";
import React, { useState } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  TableHead,
  IconButton,
  Collapse,
  Box,
} from "@mui/material";
import AdminLayout from "../Layout";
import ConfirmationModal from "../../../common/confirmation/ConfirmationModal";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";

const URL = import.meta.env.VITE_LOCAL_DOAMIN;

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<any>(null);
  const [isSubCategory, setIsSubCategory] = useState(false);
  const [parentCategoryId, setParentCategoryId] = useState<any>("");
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [openSubcategories, setOpenSubcategories] = useState<any>(false);
  const [deleteCategoryConfirmation, setDeleteCategoryConfirmation] =
    useState<boolean>(false);
  const [deleteCategoryId, setDeleteCategoryId] = useState<number | null | any>(
    null
  );
  const [subCategories, setSubCategories] = useState([]);
  const [mainCategories, setMainCategories] = useState([]);

  const fetchCategories = async () => {
    const response = await axios.get(URL + "/categories");
    const fetchedCategories = response?.data?.data.sort(
      (a: any, b: any) => a.order - b.order
    );
    setCategories(fetchedCategories);

    // filtering the top level categories
    const fetchedMainCategories = fetchedCategories.filter(
      (category: any) => category.subCategoryId === null
    );
    setMainCategories(fetchedMainCategories);
  };
  const handleOpen = (category = null, isSub = false, parentId = "") => {
    setCurrentCategory(category);
    setIsSubCategory(isSub);
    setParentCategoryId(parentId);
    setOpen(true);
  };

  const handleClose = () => {
    setCurrentCategory(null);
    setIsSubCategory(false);
    setOpen(false);
  };

  const handleOpenSubcategories = async (category: any) => {
    const response = await axios.get(URL + "/category/" + category.id);
    setSelectedCategory(response?.data?.data);
    setOpenSubcategories(true);
  };

  const handleCloseSubcategories = () => {
    setSelectedCategory(null);
    setOpenSubcategories(false);
  };

  const deleteCategory = async () => {
    await axios.delete(URL + "/category/" + deleteCategoryId).then(() => {
      fetchCategories();
      setDeleteCategoryConfirmation(false);
    });
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const category: any = {
      name: event.target.name.value,
      order: parseInt(event.target.order.value), // added order field
    };

    if (currentCategory) {
      await axios.put(URL + `/category/${currentCategory?.id}`, category);
    } else if (isSubCategory) {
      category.categoryId = parentCategoryId;
      await axios.post(URL + "/subcategory", category);
    } else {
      await axios.post(URL + "/category", category);
    }

    handleClose();
    fetchCategories();
  };
  React.useEffect(() => {
    fetchCategories();
  }, []);

  interface RowProps {
    row: any;
    level?: number;
  }

  const Row = ({ row, level = 0 }: RowProps) => {
    const [open, setOpen] = React.useState(false);

    // To filter the direct children of a category
    const subCategories = categories.filter(
      (category: any) => category.subCategoryId === row.id
    );

    const rowStyle = [
      { backgroundColor: "white" },
      { backgroundColor: "#f0f0f0" },
      { backgroundColor: "#e0e0e0" },
    ];

    return (
      <React.Fragment>
        <TableRow style={rowStyle[level]}>
          <TableCell>
            {subCategories.length > 0 && (
              <IconButton size="small" onClick={() => setOpen(!open)}>
                {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
              </IconButton>
            )}
          </TableCell>
          <TableCell component="th" scope="row">
            {row.order}
          </TableCell>
          <TableCell component="th" scope="row">
            {row.name}
          </TableCell>
          <TableCell align="right">
            <Button color="primary" onClick={() => handleOpen(row, false)}>
              Edit
            </Button>
            <Button
              color="secondary"
              onClick={() => {
                setDeleteCategoryConfirmation(true);
                setDeleteCategoryId(row.id);
              }}
            >
              Delete
            </Button>
            <Button
              color="primary"
              onClick={() => handleOpen(null, true, row.id)}
            >
              Add Subcategory
            </Button>
          </TableCell>
        </TableRow>
        {subCategories.map((subCategory: any) => (
          <TableRow>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
              <Collapse in={open} timeout="auto" unmountOnExit>
                <Box margin={1}>
                  <Table size="small" aria-label="purchases">
                    <TableBody>
                      <Row
                        key={subCategory.id}
                        row={subCategory}
                        level={level + 1}
                      />
                    </TableBody>
                  </Table>
                </Box>
              </Collapse>
            </TableCell>
          </TableRow>
        ))}
      </React.Fragment>
    );
  };

  return (
    <AdminLayout>
      <ConfirmationModal
        open={deleteCategoryConfirmation}
        title="Delete Category?"
        description="Are you sure you want to delete the category?"
        onAgree={deleteCategory}
        onClose={() => {
          setDeleteCategoryConfirmation(false);
          setDeleteCategoryId(null);
        }}
      />
      <div>
        <h1 style={{ color: "#fff" }}>Manage Categories</h1>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "end",
            margin: "10px 0px",
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleOpen()}
          >
            Add Category
          </Button>
        </div>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>Order</TableCell>
                <TableCell>Category Name</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mainCategories.map((category: any) => (
                <Row key={category.id} row={category} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>
            {currentCategory ? "Edit" : "Add"}{" "}
            {isSubCategory ? "Subcategory" : "Category"}
          </DialogTitle>
          <DialogContent>
            <form onSubmit={handleSubmit}>
              <DialogContentText>Order</DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="order"
                type="number"
                fullWidth
                defaultValue={currentCategory ? currentCategory.order : 0}
              />

              <DialogContentText>
                {isSubCategory ? "Subcategory" : "Category"} Name
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                type="text"
                fullWidth
                defaultValue={currentCategory ? currentCategory.name : ""}
              />

              <Button type="submit" color="primary">
                {currentCategory ? "Update" : "Save"}
              </Button>
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog open={openSubcategories} onClose={handleCloseSubcategories}>
          <DialogTitle>Subcategories</DialogTitle>
          <DialogContent sx={{ width: "500px" }}>
            {selectedCategory &&
              selectedCategory.subCategoriesRelation.map((subcategory: any) => (
                <div
                  key={subcategory.id}
                  style={{
                    background: "#f3f3f3",
                    padding: "6px",
                    borderRadius: "8px",
                    margin: "4px 0px",
                  }}
                >
                  <h4>{subcategory.name}</h4>
                </div>
              ))}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseSubcategories} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </AdminLayout>
  );
};

export default ManageCategories;
