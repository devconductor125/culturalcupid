import React, { useState } from "react";
import AdminLayout from "../Layout";
import { Button, Grid, Switch, TextField } from "@mui/material";
import { useFormik } from "formik";
import axios from "axios";
const URL = import.meta.env.VITE_LOCAL_DOAMIN;

const Storage = () => {
  const [storage, setStorage] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(false);

  const formik = useFormik({
    initialValues: {
      wasabiEnabled: storage?.wasabiEnabled,
      wasabiBucketName: storage?.wasabiBucketName,
      wasabiAccessKeyId: storage?.wasabiAccessKeyId,
      wasabiAccessKeySecret: storage?.wasabiAccessKeySecret,
      s3Enabled: storage?.s3Enabled,
      s3BucketName: storage?.s3BucketName,
      s3AccessKeyId: storage?.s3AccessKeyId,
      s3AccessKeySecret: storage?.s3AccessKeySecret,
      wasabiRegion: storage?.wasabiRegion,
      s3Region: storage?.s3Region,
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      setLoading(true);
      await axios.patch(URL + "/storage", values).then(() => {
        setLoading(false);
        setTimeout(() => {
          (window as Window).location.reload();
        }, 1000);
      });
    },
  });

  React.useEffect(() => {
    (async () => {
      await axios.get(URL + `/storage`).then((response) => {
        setStorage(response.data);
      });
    })();
  }, []);
  return (
    <AdminLayout>
      <h1
        style={{ color: "#fff", fontWeight: "bold", fontFamily: "monospace" }}
      >
        Manage Storage
      </h1>

      <Grid container sx={{ color: "#fff" }}>
        <Grid item xs={12} md={6}>
          <h2>
            Wasabi{" "}
            <Switch
              checked={formik.values.wasabiEnabled}
              onChange={formik.handleChange}
              id="wasabiEnabled"
            />
          </h2>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              margin: "10px 0px",
            }}
          >
            <label>Bucket Name</label>
            <TextField
              value={formik.values.wasabiBucketName}
              sx={{ background: "#fff", width: "70%" }}
              onChange={formik.handleChange}
              id="wasabiBucketName"
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              margin: "10px 0px",
            }}
          >
            <label>Access Key ID</label>
            <TextField
              value={formik.values.wasabiAccessKeyId}
              sx={{ background: "#fff", width: "70%" }}
              onChange={formik.handleChange}
              id="wasabiAccessKeyId"
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              margin: "10px 0px",
            }}
          >
            <label>Access Key Secret</label>
            <TextField
              value={formik.values.wasabiAccessKeySecret}
              sx={{ background: "#fff", width: "70%" }}
              onChange={formik.handleChange}
              id="wasabiAccessKeySecret"
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              margin: "10px 0px",
            }}
          >
            <label>Region</label>
            <TextField
              value={formik.values.wasabiRegion}
              sx={{ background: "#fff", width: "70%" }}
              onChange={formik.handleChange}
              id="wasabiRegion"
            />
          </div>
        </Grid>
        <Grid item xs={12} md={6}>
          <h2>
            S3{" "}
            <Switch
              checked={formik.values.s3Enabled}
              onChange={formik.handleChange}
              id="s3Enabled"
            />
          </h2>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              margin: "10px 0px",
            }}
          >
            <label>Bucket Name</label>
            <TextField
              value={formik.values.s3BucketName}
              sx={{ background: "#fff", width: "70%" }}
              onChange={formik.handleChange}
              id="s3BucketName"
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              margin: "10px 0px",
            }}
          >
            <label>Access Key ID</label>
            <TextField
              value={formik.values.s3AccessKeyId}
              sx={{ background: "#fff", width: "70%" }}
              onChange={formik.handleChange}
              id="s3AccessKeyId"
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              margin: "10px 0px",
            }}
          >
            <label>Access Key Secret</label>
            <TextField
              value={formik.values.s3AccessKeySecret}
              sx={{ background: "#fff", width: "70%" }}
              onChange={formik.handleChange}
              id="s3AccessKeySecret"
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              margin: "10px 0px",
            }}
          >
            <label>Region</label>
            <TextField
              value={formik.values.s3Region}
              sx={{ background: "#fff", width: "70%" }}
              onChange={formik.handleChange}
              id="s3Region"
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

export default Storage;
