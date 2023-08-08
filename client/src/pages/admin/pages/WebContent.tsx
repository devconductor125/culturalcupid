import React, { useEffect, useState } from "react";
import AdminLayout from "../Layout";
import { Button, Grid, Switch, TextField } from "@mui/material";
import { useFormik } from "formik";
import axios from "axios";
import { uploadImages } from "../../../api/post";
import { useQuery } from "@tanstack/react-query";
import { getLanguages } from "../../../api/language/language";
import SimpleSelect from "../../../common/select";
const URL = import.meta.env.VITE_LOCAL_DOAMIN;

const WebContent = () => {
  const [siteData, setSiteData] = useState<any>({});
  const [logoFile, setLogoFile] = useState<any>({});
  const [favIconFile, setFavIconFile] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(false);
  const siteInfoFormik = useFormik({
    initialValues: {
      siteName: siteData?.siteName,
      siteSlogan: siteData?.siteSlogan,
      logo: siteData?.logo,
      favicon: siteData?.favicon,
      maintainence: siteData?.maintainence,
      defaultLanguage: siteData?.defaultLanguage,
      dateFormat: siteData?.dateFormat,
      background: siteData?.background,
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      setLoading(true);
      await axios.post(URL + "/admin/static-content", values).then(() => {
        setLoading(false);
        setTimeout(() => {
          (window as Window).location.reload();
        }, 1000);
      });
    },
  });

  useEffect(() => {
    (async () => {
      await axios.get(URL + "/admin/static-content").then((response) => {
        setSiteData(response.data);
      });
    })();
  }, []);

  useEffect(() => {
    const upload = async () => {
      const formData = new FormData();
      formData.append("image", logoFile);
      await uploadImages({ formData }).then(async (image) => {
        siteInfoFormik.setFieldValue("logo", image?.data[0]);
        await axios
          .post(URL + "/admin/static-content", {
            logo: image?.data[0],
          })
          .then(() => {
            setLoading(false);
            setTimeout(() => {
              (window as Window).location.reload();
            }, 1000);
          });
      });
    };
    if (logoFile?.name) {
      setLoading(true);
      upload();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [logoFile]);
  useEffect(() => {
    const upload = async () => {
      const formData = new FormData();
      formData.append("image", favIconFile);
      await uploadImages({ formData }).then(async (image) => {
        siteInfoFormik.setFieldValue("favicon", image?.data[0]);
        await axios
          .post(URL + "/admin/static-content", {
            favicon: image?.data[0],
          })
          .then(() => {
            setLoading(false);
            setTimeout(() => {
              (window as Window).location.reload();
            }, 1000);
          });
      });
    };
    if (favIconFile?.name) {
      setLoading(true);
      upload();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [favIconFile]);

  const { data: langauges }: any = useQuery(
    ["GetLanguages"],
    async () => await getLanguages(),
    {
      select: (data) => {
        const result = data?.map(
          (val: {
            id: string;
            code: string;
            name: string;
            subCategoryId: string | undefined | null;
          }) => ({
            id: val.id,
            label: val.name,
            value: val,
            code: val.code,
            subCategoryId: val.subCategoryId || null,
          })
        );
        return result;
      },
    }
  );

  const dateFormats: any = [
    {
      id: "1",
      label: "MM/DD/YY",
      value: "MM/DD/YY",
      subCategoryId: null,
    },
    {
      id: "2",
      label: "DD/MM/YY",
      value: "DD/MM/YY",
      subCategoryId: null,
    },
    {
      id: "3",
      label: "YY/MM/DD",
      value: "YY/MM/DD",
      subCategoryId: null,
    },
  ];

  console.log(
    siteInfoFormik.values.dateFormat,
    siteInfoFormik.values.defaultLanguage
  );

  return (
    <AdminLayout>
      <Grid container sx={{ color: "#fff" }}>
        <Grid item md={6}>
          <h2>Site Settings</h2>
          <div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label>Site Name</label>
              <TextField
                value={siteInfoFormik.values.siteName}
                sx={{ background: "#fff", width: "70%" }}
                onChange={siteInfoFormik.handleChange}
                id="siteName"
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                margin: "10px 0px",
              }}
            >
              <label>Site Slogan</label>
              <TextField
                value={siteInfoFormik.values.siteSlogan}
                sx={{ background: "#fff", width: "70%" }}
                onChange={siteInfoFormik.handleChange}
                id="siteSlogan"
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                margin: "10px 0px",
              }}
            >
              <label>Site Background</label>
              <TextField
                value={siteInfoFormik.values.background}
                sx={{ background: "#fff", width: "70%" }}
                onChange={siteInfoFormik.handleChange}
                id="background"
              />
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                margin: "10px 0px",
              }}
            >
              <h3>Site Logo</h3>
              {siteInfoFormik.values.logo ? (
                <label
                  htmlFor="logo"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <img
                    src={siteInfoFormik.values.logo}
                    alt="site logo"
                    style={{
                      width: "100px",
                      height: "100px",
                      borderRadius: "50%",
                    }}
                  />
                  <input
                    type="file"
                    id="logo"
                    onChange={(e: any) => {
                      if (e.target.files.length > 0) {
                        setLogoFile(e.target.files[0]);
                      }
                    }}
                  />
                </label>
              ) : (
                <>
                  <input
                    type="file"
                    id="logo"
                    onChange={(e: any) => {
                      if (e.target.files.length > 0) {
                        setLogoFile(e.target.files[0]);
                      }
                    }}
                  />
                </>
              )}
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                margin: "10px 0px",
              }}
            >
              <h3>Site Favicon</h3>
              {siteInfoFormik.values.favicon ? (
                <label
                  htmlFor="favicon"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <img
                    src={siteInfoFormik.values.favicon}
                    alt="site logo"
                    style={{
                      width: "100px",
                      height: "100px",
                      borderRadius: "50%",
                    }}
                  />
                  <input
                    type="file"
                    id="favcion"
                    onChange={(e: any) => {
                      if (e.target.files.length > 0) {
                        setFavIconFile(e.target.files[0]);
                      }
                    }}
                  />
                </label>
              ) : (
                <>
                  <input
                    type="file"
                    id="favicon"
                    onChange={(e: any) => {
                      if (e.target.files.length > 0) {
                        setFavIconFile(e.target.files[0]);
                      }
                    }}
                  />
                </>
              )}
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                margin: "20px 0px",
              }}
            >
              <label style={{ fontWeight: "bold" }}>
                Maintainence Mode
                <Switch
                  checked={siteInfoFormik.values.maintainence}
                  onChange={siteInfoFormik.handleChange}
                  id="maintainence"
                />
              </label>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                margin: "20px 0px",
              }}
            >
              <label style={{ fontWeight: "bold" }}>
                Default Language (
                {siteInfoFormik.values.defaultLanguage &&
                  JSON.parse(siteInfoFormik.values.defaultLanguage)?.name}
                )
              </label>
              {langauges?.length > 0 &&
                siteInfoFormik.values.defaultLanguage && (
                  <SimpleSelect
                    // label={"Ad language"}
                    list={langauges}
                    // sx={{ m: 1 }}
                    // id="defaultLanguage"
                    // value={JSON.parse(siteInfoFormik.values.defaultLanguage)}
                    onChange={(e: any) =>
                      siteInfoFormik.setFieldValue(
                        "defaultLanguage",
                        JSON.stringify(e[0])
                      )
                    }
                  />
                )}
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                margin: "20px 0px",
              }}
            >
              <label style={{ fontWeight: "bold" }}>
                Date Format({siteInfoFormik?.values?.dateFormat})
              </label>

              <SimpleSelect
                // label={"Ad language"}
                list={dateFormats}
                // sx={{ m: 1 }}
                // id="dateFormat"
                // value={siteInfoFormik.values.dateFormat}
                onChange={(e: any) =>
                  siteInfoFormik.setFieldValue(
                    "dateFormat",
                    JSON.stringify(e[0])
                  )
                }
              />
            </div>
            <Button
              onClick={siteInfoFormik.handleSubmit as any}
              variant="contained"
              sx={{ m: 2 }}
              disabled={loading}
            >
              Save
            </Button>
          </div>
        </Grid>
        <Grid item md={6}></Grid>
      </Grid>
    </AdminLayout>
  );
};

export default WebContent;
