import React, { useState } from "react";
import AdminLayout from "../Layout";
import { useFormik } from "formik";
import axios from "axios";
import { Button, Grid, TextField } from "@mui/material";
const URL = import.meta.env.VITE_LOCAL_DOAMIN;

const Uploads = () => {
  const [Uploads, setUploads] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(false);
  const formik = useFormik({
    initialValues: {
      allowedExtensions: Uploads.allowedExtensions,
      allowedMimeTypes: Uploads.allowedMimeTypes,
      maxUploadSize: Uploads.maxUploadSize,
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      setLoading(true);
      await axios.patch(URL + "/uploads", values).then(() => {
        setLoading(false);
        setTimeout(() => {
          (window as Window).location.reload();
        }, 1000);
      });
    },
  });

  React.useEffect(() => {
    (async () => {
      await axios.get(URL + `/uploads`).then((response) => {
        setUploads(response.data);
      });
    })();
  }, []);
  return (
    <AdminLayout>
      <h1
        style={{ color: "#fff", fontWeight: "bold", fontFamily: "monospace" }}
      >
        Manage Uploads Details
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
            <label>Allowed Extensions</label>
            <TextField
              value={formik.values.allowedExtensions}
              sx={{ background: "#fff", width: "70%" }}
              onChange={formik.handleChange}
              id="allowedExtensions"
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              margin: "10px 0px",
            }}
          >
            <label>Allowed MIME Types</label>
            <TextField
              value={formik.values.allowedMimeTypes}
              sx={{ background: "#fff", width: "70%" }}
              onChange={formik.handleChange}
              id="allowedMimeTypes"
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              margin: "10px 0px",
            }}
          >
            <label>Max Upload Size</label>
            <TextField
              value={formik.values.maxUploadSize}
              sx={{ background: "#fff", width: "70%" }}
              onChange={formik.handleChange}
              id="maxUploadSize"
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

export default Uploads;
