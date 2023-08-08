import React, { useState } from "react";
import AdminLayout from "../Layout";
import { useFormik } from "formik";
import axios from "axios";
import { Button, Grid } from "@mui/material";
const URL = import.meta.env.VITE_LOCAL_DOAMIN;

const Theme = () => {
  const [Theme, setTheme] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(false);
  const formik = useFormik({
    initialValues: {
      type: Theme.type,
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      setLoading(true);
      await axios.patch(URL + "/theme", values).then(() => {
        setLoading(false);
      });
    },
  });

  React.useEffect(() => {
    (async () => {
      await axios.get(URL + `/theme`).then((response) => {
        setTheme(response.data);
      });
    })();
  }, []);

  const themeTypes = ["RTL", "LTR"];

  return (
    <AdminLayout>
      <h1
        style={{ color: "#fff", fontWeight: "bold", fontFamily: "monospace" }}
      >
        Manage Theme Details
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
            <label>Theme Type</label>

            <select
              name="type"
              id="type"
              onChange={formik.handleChange}
              style={{ padding: "10px" }}
              value={formik.values.type}
            >
              {themeTypes?.map((t) => {
                return <option value={t}>{t}</option>;
              })}
            </select>
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

export default Theme;
