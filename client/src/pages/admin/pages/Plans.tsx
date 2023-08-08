import axios from "axios";
import React from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  DialogActions,
  Dialog,
  DialogTitle,
  DialogContentText,
  DialogContent,
} from "@mui/material";
import AdminLayout from "../Layout";

const URL = import.meta.env.VITE_LOCAL_DOAMIN;

const Plans = () => {
  const [plans, setPlans] = React.useState([]);
  const [open, setOpen] = React.useState<boolean>(false);
  const [currentPlan, setCurrentPlan] = React.useState<any>(null);

  // Fetch plans
  const fetchPlans = async () => {
    await axios.get(URL + "/plan").then((response) => {
      console.log(response);
      setPlans(response?.data?.data);
    });
  };

  // Delete plan
  const deletePlan = async (planName: any) => {
    await axios.delete(URL + "/plan/" + planName);
    fetchPlans(); // refresh plans after deletion
  };

  React.useEffect(() => {
    fetchPlans();
  }, []);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const plan = {
      name: event.target.name.value,
      postNumber: event.target.postNumber.value,
      featuedPostNumber: event.target.featuedPostNumber.value,
      price: event.target.price.value,
      browseAndSaveAds: event.target.browseAndSaveAds.checked,
      messageAdvertisers: event.target.messageAdvertisers.checked,
      chatWithAdvertisers: event.target.chatWithAdvertisers.checked,
      createGroupChats: event.target.createGroupChats.checked,
      postVideoUrls: event.target.postVideoUrls.checked,
      uploadVideos: event.target.uploadVideos.checked,
      featuredMember: event.target.featuredMember.checked,
      price90Days: event.target.price90Days.value,
      priceAnnual: event.target.priceAnnual.value,
      discountPercent: event.target.discountPercent.value,
      discountedPrice: event.target.discountedPrice.value,
    };

    console.log(plan);
    if (currentPlan?.id) {
      await axios
        .put(URL + "/plan", {
          ...plan,
          id: currentPlan.id,
          discountedPrice:
            parseFloat(event.target.price.value) -
            parseFloat(event.target.price.value) *
              (parseFloat(event.target.discountPercent.value) / 100),
        })
        .then(() => {
          fetchPlans();
          setOpen(false);
          setCurrentPlan(null);
        });
    } else {
      await axios.post(URL + "/plan", plan).then(() => {
        fetchPlans();
        setOpen(false);
        setCurrentPlan(null);
      });
    }

    handleClose();
    fetchPlans();
  };

  console.log(currentPlan);

  const handleClose = () => {
    setOpen(false);
    setCurrentPlan(null);
  };

  const handleOpen = (plan: any) => {
    setCurrentPlan(plan);
    setOpen(true);
  };

  return (
    <AdminLayout>
      <div>
        <h1 style={{ color: "#fff" }}>Manage Plans</h1>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "end",
            margin: "10px 0px",
          }}
        >
          <Button variant="contained" color="primary" onClick={handleOpen}>
            Add Plan
          </Button>
        </div>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Plan Name</TableCell>
                <TableCell align="center">Post Number</TableCell>
                <TableCell align="center">Featured Post Number</TableCell>
                {/* <TableCell align="center">Price</TableCell> */}
                <TableCell align="center">Browse ADs</TableCell>
                <TableCell align="center">Message Advertisers</TableCell>
                <TableCell align="center">Chat with advertisers</TableCell>
                <TableCell align="center">Create group chat</TableCell>
                <TableCell align="center">Post URL Videos</TableCell>
                <TableCell align="center">Upload Videos</TableCell>
                <TableCell align="center">Featured Member</TableCell>
                <TableCell align="center">90 Days Price</TableCell>
                <TableCell align="center">Annual Price</TableCell>
                <TableCell align="center">Discount Percentage</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {plans.map((plan: any) => (
                <TableRow key={plan.name}>
                  <TableCell component="th" scope="row">
                    {plan.name}
                  </TableCell>
                  <TableCell align="center">{plan.postNumber}</TableCell>
                  <TableCell align="center">{plan.featuedPostNumber}</TableCell>
                  {/* <TableCell align="center">{plan.price}</TableCell> */}
                  <TableCell align="center">
                    {plan.browseAndSaveAds ? "Yes" : "No"}
                  </TableCell>
                  <TableCell align="center">
                    {plan.messageAdvertisers ? "Yes" : "No"}
                  </TableCell>
                  <TableCell align="center">
                    {plan.chatWithAdvertisers ? "Yes" : "No"}
                  </TableCell>
                  <TableCell align="center">
                    {plan.createGroupChats ? "Yes" : "No"}
                  </TableCell>
                  <TableCell align="center">
                    {plan.postVideoUrls ? "Yes" : "No"}
                  </TableCell>
                  <TableCell align="center">
                    {plan.uploadVideos ? "Yes" : "No"}
                  </TableCell>
                  <TableCell align="center">
                    {plan.featuredMember ? "Yes" : "No"}
                  </TableCell>
                  <TableCell align="center">{plan.price90Days}</TableCell>
                  <TableCell align="center">{plan.priceAnnual}</TableCell>
                  <TableCell align="center">{plan.discountPercent}</TableCell>
                  <TableCell align="center">
                    <Button
                      color="secondary"
                      onClick={() => deletePlan(plan.name)}
                    >
                      Delete
                    </Button>
                    <Button color="primary" onClick={() => handleOpen(plan)}>
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">
            {currentPlan ? "Edit Plan" : "Add Plan"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              {currentPlan
                ? "Edit the details of this plan."
                : "Enter the details of the new plan."}
            </DialogContentText>
            <form
              onSubmit={handleSubmit}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                width: "300px",
              }}
            >
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Plan Name"
                type="text"
                fullWidth
                defaultValue={currentPlan ? currentPlan.name : ""}
              />
              <TextField
                margin="dense"
                id="postNumber"
                label="Post Number"
                type="number"
                fullWidth
                defaultValue={currentPlan ? currentPlan.postNumber : ""}
              />
              <TextField
                margin="dense"
                id="featuedPostNumber"
                label="Featured Post Number"
                type="number"
                fullWidth
                defaultValue={currentPlan ? currentPlan.featuedPostNumber : ""}
              />
              {/* <TextField
                margin="dense"
                id="price"
                label="Price"
                type="text"
                fullWidth
                defaultValue={currentPlan ? currentPlan.price : ""}
              /> */}
              <TextField
                margin="dense"
                id="price90Days"
                label="90 days Price"
                type="text"
                fullWidth
                defaultValue={currentPlan ? currentPlan.price90Days : ""}
              />
              <TextField
                margin="dense"
                id="priceAnnual"
                label="Annual Price"
                type="text"
                fullWidth
                defaultValue={currentPlan ? currentPlan.priceAnnual : ""}
              />
              <TextField
                margin="dense"
                id="discountPercent"
                label="Discount Percentage"
                type="text"
                fullWidth
                defaultValue={currentPlan ? currentPlan.discountPercent : ""}
              />
              <TextField
                margin="dense"
                id="discountedPrice"
                label="Discounted Price"
                type="text"
                fullWidth
                defaultValue={currentPlan ? currentPlan.discountedPrice : ""}
              />
              <div>
                <label htmlFor="browseAndSaveAds">Browse & Save ADs</label>
                <input
                  type="checkbox"
                  id="browseAndSaveAds"
                  defaultChecked={currentPlan?.browseAndSaveAds || false}
                />
              </div>
              <div>
                <label htmlFor="messageAdvertisers">Message Advertisers</label>
                <input
                  type="checkbox"
                  id="messageAdvertisers"
                  defaultChecked={currentPlan?.messageAdvertisers || false}
                />
              </div>
              <div>
                <label htmlFor="chatWithAdvertisers">
                  Chat With Advertisers
                </label>
                <input
                  type="checkbox"
                  id="chatWithAdvertisers"
                  defaultChecked={currentPlan?.chatWithAdvertisers || false}
                />
              </div>
              <div>
                <label htmlFor="createGroupChats">Create Group Chats</label>
                <input
                  type="checkbox"
                  id="createGroupChats"
                  defaultChecked={currentPlan?.createGroupChats || false}
                />
              </div>
              <div>
                <label htmlFor="postVideoUrls">Post Video URLs</label>
                <input
                  type="checkbox"
                  id="postVideoUrls"
                  defaultChecked={currentPlan?.postVideoUrls || false}
                />
              </div>
              <div>
                <label htmlFor="uploadVideos">Upload Videos</label>
                <input
                  type="checkbox"
                  id="uploadVideos"
                  defaultChecked={currentPlan?.uploadVideos || false}
                />
              </div>
              <div>
                <label htmlFor="featuredMember">Featured Member</label>
                <input
                  type="checkbox"
                  id="featuredMember"
                  defaultChecked={currentPlan?.featuredMember || false}
                />
              </div>
              <Button type="submit" color="primary" variant="contained">
                Save
              </Button>
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </AdminLayout>
  );
};

export default Plans;
