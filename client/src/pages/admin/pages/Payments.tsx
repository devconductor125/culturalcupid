import React, { useState } from "react";
import AdminLayout from "../Layout";
import { useFormik } from "formik";
import axios from "axios";
import { Button, Grid, TextField } from "@mui/material";
const URL = import.meta.env.VITE_LOCAL_DOAMIN;

const Payments = () => {
  const [Payments, setPayments] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(false);
  const formik = useFormik({
    initialValues: {
      stripeKey: Payments.stripeKey,
      paypalClientId: Payments.paypalClientId,
      paypalSecretKey: Payments.paypalSecretKey,
      stripePublicKey: Payments.stripePublicKey,
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      setLoading(true);
      await axios.patch(URL + "/payments", values).then(() => {
        setLoading(false);
        setTimeout(() => {
          (window as Window).location.reload();
        }, 1000);
      });
    },
  });

  React.useEffect(() => {
    (async () => {
      await axios.get(URL + `/payments`).then((response) => {
        setPayments(response.data);
      });
    })();
  }, []);
  return (
    <AdminLayout>
      <h1
        style={{ color: "#fff", fontWeight: "bold", fontFamily: "monospace" }}
      >
        Manage Payments Details
      </h1>

      <Grid container sx={{ color: "#fff" }}>
        <Grid item xs={12} md={6}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              margin: "10px 0px",
            }}
          >
            <label>Stripe Key</label>
            <TextField
              value={formik.values.stripeKey}
              sx={{ background: "#fff", width: "70%" }}
              onChange={formik.handleChange}
              id="stripeKey"
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              margin: "10px 0px",
            }}
          >
            <label>Stripe Public Key</label>
            <TextField
              value={formik.values.stripePublicKey}
              sx={{ background: "#fff", width: "70%" }}
              onChange={formik.handleChange}
              id="stripePublicKey"
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              margin: "10px 0px",
            }}
          >
            <label>Paypal Client ID</label>
            <TextField
              value={formik.values.paypalClientId}
              sx={{ background: "#fff", width: "70%" }}
              onChange={formik.handleChange}
              id="paypalClientId"
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              margin: "10px 0px",
            }}
          >
            <label>Paypal Secret Key</label>
            <TextField
              value={formik.values.paypalSecretKey}
              sx={{ background: "#fff", width: "70%" }}
              onChange={formik.handleChange}
              id="paypalSecretKey"
            />
          </div>
        </Grid>

        <Grid
          xs={12}
          md={12}
          justifyContent={"end"}
          alignItems={"center"}
          display={"flex"}
        >
          <Button
            onClick={formik.handleSubmit as any}
            variant="contained"
            sx={{ mx: 20, my: 2 }}
            disabled={loading}
          >
            Save
          </Button>
        </Grid>
      </Grid>
    </AdminLayout>
  );
};

export default Payments;
