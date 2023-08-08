import React, { useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import { Button, Grid } from "@mui/material";
import StyledCard, { CardProps } from "../../modules/card";
import { GridCard } from "../home/styles";
import ConfirmationModal from "../../common/confirmation/ConfirmationModal";
import { AxiosRequestConfig } from "axios";

const MyAds = () => {
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [id, setId] = useState<any>(null);

  React.useEffect(() => {
    (async () => {
      const response = await axiosInstance({
        method: "GET",
        url: "/user-posts",
      });
      setPosts(response.data?.data);
    })();
  }, []);

  const deletePost = async () => {
    if (id) {
      await axiosInstance
        .delete("/post", {
          data: {
            id,
          },
        })
        .then(() => {
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        });
    }
  };

  console.log(posts);
  return (
    <div>
      <ConfirmationModal
        title="Are you sure you want to delete this post?"
        description="Agreeing will delete this post and can be recovered by admin only"
        onAgree={deletePost}
        open={open}
        onClose={() => {
          setOpen(false);
          setId(null);
        }}
      />
      <Grid container sx={{ padding: 5 }}>
        {posts &&
          posts?.length > 0 &&
          posts.map((val: CardProps, idx: number) => (
            <GridCard item key={idx} xs={12} sm={12} md={3}>
              <StyledCard
                data={val}
                setChatModal={() => ({})}
                setMessageModal={() => ({})}
                setShareModal={() => ({})}
              />
              <Button
                sx={{ bgcolor: "red", mt: -25, ml: 2 }}
                onClick={() => {
                  setOpen(true);
                  setId(val?.id);
                }}
              >
                Delete
              </Button>
            </GridCard>
          ))}
      </Grid>
    </div>
  );
};

export default MyAds;
