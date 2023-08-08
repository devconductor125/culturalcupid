import React, { useState } from "react";
import { Grid, Modal, Typography } from "@mui/material";
import { getUserInfo } from "../../api/auth";
import { ModalContainer } from "./styles";

const MyProfileModal = ({ open, onClose }: any) => {
  const [user, setUser] = useState<any>({});
  React.useEffect(() => {
    (async () => {
      const u = await getUserInfo();
      setUser(u?.data);
    })();
  }, []);
  console.log(user);
  return (
    <Modal open={open} onClose={onClose}>
      <ModalContainer>
        <Typography
          component={"div"}
          textAlign={"center"}
          color={"#000"}
          paddingBottom={0}
          fontWeight={800}
          fontSize={30}
        >
          My Profile
        </Typography>
        <Grid container spacing={4}>
          <Grid item md={4} lg={4} xl={4} display={"flex"}>
            <Typography fontWeight={"bold"}>Email:</Typography>
            <Typography marginLeft={2}>{user?.email}</Typography>
          </Grid>
          <Grid item md={4} lg={4} xl={4} display={"flex"}>
            <Typography fontWeight={"bold"}>Business Email:</Typography>
            <Typography marginLeft={2}>
              {user?.businessEmail || "NA"}
            </Typography>
          </Grid>
          <Grid item md={4} lg={4} xl={4} display={"flex"}>
            <Typography fontWeight={"bold"}>Telephone:</Typography>
            <Typography marginLeft={2}>{user?.telephone || "NA"}</Typography>
          </Grid>
          <Grid item md={4} lg={4} xl={4} display={"flex"}>
            <Typography fontWeight={"bold"}>Business Telephone:</Typography>
            <Typography marginLeft={2}>
              {user?.businessPhone || "NA"}
            </Typography>
          </Grid>
          <Grid item md={4} lg={4} xl={4} display={"flex"}>
            <Typography fontWeight={"bold"}>Name:</Typography>
            <Typography marginLeft={2}>{user?.name || "NA"}</Typography>
          </Grid>
          <Grid item md={4} lg={4} xl={4} display={"flex"}>
            <Typography fontWeight={"bold"}>Address:</Typography>
            <Typography marginLeft={2}>{user?.address || "NA"}</Typography>
          </Grid>
          <Grid item md={4} lg={4} xl={4} display={"flex"}>
            <Typography fontWeight={"bold"}>Speciality:</Typography>
            <Typography marginLeft={2}>{user?.speciality || "NA"}</Typography>
          </Grid>
          <Grid item md={4} lg={4} xl={4} display={"flex"}>
            <Typography fontWeight={"bold"}>Website:</Typography>
            <Typography marginLeft={2}>{user?.website || "NA"}</Typography>
          </Grid>
          <Grid item md={4} lg={4} xl={4} display={"flex"}>
            <Typography fontWeight={"bold"}>Facebook:</Typography>
            <Typography marginLeft={2}>{user?.facebook || "NA"}</Typography>
          </Grid>
          <Grid item md={4} lg={4} xl={4} display={"flex"}>
            <Typography fontWeight={"bold"}>Instagram:</Typography>
            <Typography marginLeft={2}>{user?.instagram || "NA"}</Typography>
          </Grid>
          <Grid item md={4} lg={4} xl={4} display={"flex"}>
            <Typography fontWeight={"bold"}>Twitter:</Typography>
            <Typography marginLeft={2}>{user?.twitter || "NA"}</Typography>
          </Grid>
        </Grid>
      </ModalContainer>
    </Modal>
  );
};

export default MyProfileModal;
