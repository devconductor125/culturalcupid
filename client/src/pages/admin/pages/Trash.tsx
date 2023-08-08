import React, { useState } from "react";
import AdminLayout from "../Layout";
import axios from "axios";
import ConfirmationModal from "../../../common/confirmation/ConfirmationModal";
import StyledCard, { CardProps } from "../../../modules/card";
import { GridCard } from "../../home/styles";
import { Button, Grid } from "@mui/material";
const URL = import.meta.env.VITE_LOCAL_DOAMIN;

const Trash = () => {
  const [deletedPosts, setDeletedPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [id, setId] = useState<any>(null);
  React.useEffect(() => {
    (async () => {
      await axios.get(URL + "/posts/deleted").then((resp) => {
        setDeletedPosts(resp.data?.data);
      });
    })();
  }, []);
  console.log(deletedPosts);
  const recoverPost = () => {
    if (id) {
      axios
        .post(URL + "/posts/recover", {
          id,
        })
        .then(() => {
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        });
    }
  };
  return (
    <AdminLayout>
      <ConfirmationModal
        title="Are you sure you want to recover this post?"
        description="Agreeing will recover the post to original user!"
        onAgree={recoverPost}
        open={open}
        onClose={() => {
          setOpen(false);
          setId(null);
        }}
      />
      <Grid container sx={{ padding: 5 }}>
        {deletedPosts &&
          deletedPosts?.length > 0 &&
          deletedPosts.map((val: CardProps, idx: number) => (
            <GridCard item key={idx} xs={12} sm={12} md={3}>
              <StyledCard
                data={val}
                setChatModal={() => ({})}
                setMessageModal={() => ({})}
                setShareModal={() => ({})}
              />
              <Button
                sx={{
                  bgcolor: "green",
                  mt: -25,
                  ml: 2,
                  color: "#000",
                  fontWeight: "bold",
                }}
                onClick={() => {
                  setOpen(true);
                  setId(val?.id);
                }}
              >
                Recover
              </Button>
            </GridCard>
          ))}
      </Grid>
    </AdminLayout>
  );
};

export default Trash;
