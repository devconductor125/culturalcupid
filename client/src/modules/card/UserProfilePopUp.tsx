import React, { useState } from "react";
import { Grid, Modal, Typography } from "@mui/material";
import { getUserInfo } from "../../api/auth";
import { ModalContainer } from "./styles";
import axios from "axios";
import Translate from "../../common/translate/Translate";

const URL = import.meta.env.VITE_LOCAL_DOAMIN;

const UserProfileModal = ({ open, onClose, userId }: any) => {
  const [user, setUser] = useState<any>({});
  React.useEffect(() => {
    (async () => {
      const u = await axios.get(URL + `/user/${userId}`);
      setUser(u?.data);
    })();
  }, [userId]);
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
          {user?.name || user?.username}
        </Typography>
        <Grid container spacing={4}>
          {user.showEmail && (
            <Grid item md={4} lg={4} xl={4} display={"flex"}>
              <Typography fontWeight={"bold"}>
                <Translate>Email:</Translate>{" "}
              </Typography>
              <Typography marginLeft={2}>{user?.email}</Typography>
            </Grid>
          )}
          {user.showEmail && (
            <Grid item md={4} lg={4} xl={4} display={"flex"}>
              <Typography fontWeight={"bold"}>
                {" "}
                <Translate>Business Email:</Translate>
              </Typography>
              <Typography marginLeft={2}>
                {user?.businessEmail || "NA"}
              </Typography>
            </Grid>
          )}
          {user.showMobile && (
            <Grid item md={4} lg={4} xl={4} display={"flex"}>
              <Typography fontWeight={"bold"}>
                {" "}
                <Translate>Telephone:</Translate>
              </Typography>
              <Typography marginLeft={2}>{user?.telephone || "NA"}</Typography>
            </Grid>
          )}
          {user?.showMobile && (
            <Grid item md={4} lg={4} xl={4} display={"flex"}>
              <Typography fontWeight={"bold"}>
                {" "}
                <Translate>Business Telephone:</Translate>
              </Typography>
              <Typography marginLeft={2}>
                {user?.businessPhone || "NA"}
              </Typography>
            </Grid>
          )}
          <Grid item md={4} lg={4} xl={4} display={"flex"}>
            <Typography fontWeight={"bold"}>
              {" "}
              <Translate>Name:</Translate>
            </Typography>
            <Typography marginLeft={2}>{user?.name || "NA"}</Typography>
          </Grid>
          <Grid item md={4} lg={4} xl={4} display={"flex"}>
            <Typography fontWeight={"bold"}>
              {" "}
              <Translate>Address:</Translate>
            </Typography>
            <Typography marginLeft={2}>{user?.address || "NA"}</Typography>
          </Grid>
          <Grid item md={4} lg={4} xl={4} display={"flex"}>
            <Typography fontWeight={"bold"}>
              {" "}
              <Translate>Speciality:</Translate>
            </Typography>
            <Typography marginLeft={2}>{user?.speciality || "NA"}</Typography>
          </Grid>
          <Grid item md={4} lg={4} xl={4} display={"flex"}>
            <Typography fontWeight={"bold"}>
              {" "}
              <Translate>Website:</Translate>
            </Typography>
            <Typography marginLeft={2}>{user?.website || "NA"}</Typography>
          </Grid>
          <Grid item md={4} lg={4} xl={4} display={"flex"}>
            <Typography fontWeight={"bold"}>
              {" "}
              <Translate>Facebook:</Translate>
            </Typography>
            <Typography marginLeft={2}>{user?.facebook || "NA"}</Typography>
          </Grid>
          <Grid item md={4} lg={4} xl={4} display={"flex"}>
            <Typography fontWeight={"bold"}>
              {" "}
              <Translate>Instagram:</Translate>
            </Typography>
            <Typography marginLeft={2}>{user?.instagram || "NA"}</Typography>
          </Grid>
          <Grid item md={4} lg={4} xl={4} display={"flex"}>
            <Typography fontWeight={"bold"}>
              {" "}
              <Translate>Twitter:</Translate>{" "}
            </Typography>
            <Typography marginLeft={2}>{user?.twitter || "NA"}</Typography>
          </Grid>
        </Grid>
      </ModalContainer>
    </Modal>
  );
};

export default UserProfileModal;
