import React, { useState } from "react";
import AdminLayout from "../Layout";
import { useFormik } from "formik";
import axios from "axios";
import { Button, Grid, TextField } from "@mui/material";
const URL = import.meta.env.VITE_LOCAL_DOAMIN;

const Keys = () => {
  const [Keys, setKeys] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(false);
  const formik = useFormik({
    initialValues: {
      googleMapApiKey: Keys.googleMapApiKey,
      youtubeApiKey: Keys.youtubeApiKey,
      reCaptchaKey: Keys.reCaptchaKey,
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      setLoading(true);
      await axios.patch(URL + "/keys", values).then(() => {
        setLoading(false);
        setTimeout(() => {
          (window as Window).location.reload();
        }, 1000);
      });
    },
  });

  React.useEffect(() => {
    (async () => {
      await axios.get(URL + `/keys`).then((response) => {
        setKeys(response.data);
      });
    })();
  }, []);
  return (
    <AdminLayout>
      <h1
        style={{ color: "#fff", fontWeight: "bold", fontFamily: "monospace" }}
      >
        Manage Keys Details
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
            <label>Google Map API Key</label>
            <TextField
              value={formik.values.googleMapApiKey}
              sx={{ background: "#fff", width: "70%" }}
              onChange={formik.handleChange}
              id="googleMapApiKey"
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              margin: "10px 0px",
            }}
          >
            <label>Youtube API Key</label>
            <TextField
              value={formik.values.youtubeApiKey}
              sx={{ background: "#fff", width: "70%" }}
              onChange={formik.handleChange}
              id="youtubeApiKey"
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              margin: "10px 0px",
            }}
          >
            <label>reCAPTCHA Key</label>
            <TextField
              value={formik.values.reCaptchaKey}
              sx={{ background: "#fff", width: "70%" }}
              onChange={formik.handleChange}
              id="reCaptchaKey"
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

export default Keys;
