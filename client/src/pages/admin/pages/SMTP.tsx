import React, { useState } from "react";
import AdminLayout from "../Layout";
import { useFormik } from "formik";
import axios from "axios";
import { Button, Grid, TextField } from "@mui/material";
const URL = import.meta.env.VITE_LOCAL_DOAMIN;

const SMTP = () => {
  const [smtp, setSmtp] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(false);
  const formik = useFormik({
    initialValues: {
      smtpHost: smtp.smtpHost,
      smtpPort: smtp.smtpPort,
      smtpUsername: smtp.smtpUsername,
      smtpPassword: smtp.smtpPassword,
      smtpSenderMail: smtp.smtpSenderMail,
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      setLoading(true);
      await axios.patch(URL + "/smtp", values).then(() => {
        setLoading(false);
        setTimeout(() => {
          (window as Window).location.reload();
        }, 1000);
      });
    },
  });

  React.useEffect(() => {
    (async () => {
      await axios.get(URL + `/smtp`).then((response) => {
        setSmtp(response.data);
      });
    })();
  }, []);
  return (
    <AdminLayout>
      <h1
        style={{ color: "#fff", fontWeight: "bold", fontFamily: "monospace" }}
      >
        Manage SMTP Details
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
            <label>SMTP Host</label>
            <TextField
              value={formik.values.smtpHost}
              sx={{ background: "#fff", width: "70%" }}
              onChange={formik.handleChange}
              id="smtpHost"
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              margin: "10px 0px",
            }}
          >
            <label>SMTP Port</label>
            <TextField
              value={formik.values.smtpPort}
              sx={{ background: "#fff", width: "70%" }}
              onChange={formik.handleChange}
              id="smtpPort"
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              margin: "10px 0px",
            }}
          >
            <label>SMTP Username</label>
            <TextField
              value={formik.values.smtpUsername}
              sx={{ background: "#fff", width: "70%" }}
              onChange={formik.handleChange}
              id="smtpUsername"
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              margin: "10px 0px",
            }}
          >
            <label>SMTP Password</label>
            <TextField
              value={formik.values.smtpPassword}
              sx={{ background: "#fff", width: "70%" }}
              onChange={formik.handleChange}
              id="smtpPassword"
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              margin: "10px 0px",
            }}
          >
            <label>SMTP Sender Mail</label>
            <TextField
              value={formik.values.smtpSenderMail}
              sx={{ background: "#fff", width: "70%" }}
              onChange={formik.handleChange}
              id="smtpSenderMail"
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

export default SMTP;
