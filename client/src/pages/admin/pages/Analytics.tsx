import React, { FormEvent, useState } from "react";
import AdminLayout from "../Layout";
import { useFormik } from "formik";
import axios from "axios";
import { Button, Grid, TextField } from "@mui/material";
const URL = import.meta.env.VITE_LOCAL_DOAMIN;

const Analytics = () => {
  const [Analytics, setAnalytics] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(false);
  const formik = useFormik({
    initialValues: {
      googleAnalyticCode: Analytics.googleAnalyticCode,
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      setLoading(true);
      await axios.patch(URL + "/analytics", values).then(() => {
        setLoading(false);
      });
    },
  });

  React.useEffect(() => {
    (async () => {
      await axios.get(URL + `/analytics`).then((response) => {
        setAnalytics(response.data);
      });
    })();
  }, []);
  return (
    <AdminLayout>
      <h1
        style={{ color: "#fff", fontWeight: "bold", fontFamily: "monospace" }}
      >
        Manage Analytics Details
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
            <label>Google Analytics Code</label>
            <TextField
              value={formik.values.googleAnalyticCode}
              sx={{ background: "#fff", width: "70%" }}
              onChange={formik.handleChange}
              id="googleAnalyticCode"
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

export default Analytics;
