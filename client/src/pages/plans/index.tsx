import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Grid,
  Box,
  Alert,
  AlertTitle,
} from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { Subscribe, gelAllPlans } from "../../api/plans";
import { getUserInfo } from "../../api/auth";
import SimpleBackdrop from "../../common/backdrop";
import { Link } from "react-router-dom";
import { CheckCircle, CloseRounded } from "@mui/icons-material";
import ConfirmationModal from "../../common/confirmation/ConfirmationModal";
import axiosInstance from "../../api/axiosInstance";
import Translate from "../../common/translate/Translate";

type PlansProps = {
  id?: string;
  name: string;
  featuedPostNumber: number;
  postNumber: number;
  price: number;
  onClick: (a: any) => void;
  userPlan?: string;
  browseAndSaveAds: boolean;
  messageAdvertisers: boolean;
  chatWithAdvertisers: boolean;
  createGroupChats: boolean;
  postVideoUrls: boolean;
  uploadVideos: boolean;
  featuredMember: boolean;
  price90Days?: any;
  priceAnnual?: any;
  discountPercent?: any;
};

const Plan = () => {
  const clientQuery = useQueryClient();

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openUpgradeModal, setOpenUpgradeModal] = useState(false);
  const {
    mutate,
    isLoading: MutateLoading,
    error,
    isError,
  } = useMutation<any, Error, any>((planId: string) => Subscribe(planId), {
    onSuccess: (data) => {
      clientQuery.invalidateQueries(["userInfo"]);
      console.log(data);
      refetch();
    },
  });

  const { data, refetch, isLoading } = useQuery(
    ["plans"],
    async () => {
      const plans = await gelAllPlans();
      const user = await getUserInfo();

      return {
        plans,
        user,
      };
    },
    {
      select: ({ plans, user }) => {
        return {
          plans: plans.data as PlansProps[],
          user: user.data,
        };
      },
    }
  );

  const cancelPlan = async () => {
    await axiosInstance.delete("/plan/cancel").then(() => {
      refetch();
      setOpenDeleteModal(false);
    });
  };
  const upgradePlan = async () => {
    await axiosInstance.post("/plan/upgrade").then(() => {
      refetch();
      setOpenUpgradeModal(false);
    });
  };

  return (
    <div>
      <ConfirmationModal
        open={openDeleteModal}
        onAgree={cancelPlan}
        onClose={() => setOpenDeleteModal(false)}
        title="Cancel Plan"
        description="Are you sure you want to cancel this plan?"
      />
      <ConfirmationModal
        open={openUpgradeModal}
        onAgree={upgradePlan}
        onClose={() => setOpenUpgradeModal(false)}
        title="Upgrade Plan"
        description="How would you like to upgrade your plan?"
        agreeText="Upgrade Now"
        disAgreeText="Close"
        third
        thirdClick={upgradePlan}
        thirdText="Upgrade at the end of month."
      />
      <Box display={"flex"} justifyContent={"center"} m={5}>
        {isError && (
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            {error.message}
            {" recharge balance here "}
            <Link to={"/wallet"}>check it out!</Link>
          </Alert>
        )}
      </Box>
      <Box display={"flex"} justifyContent={"center"} m={5}>
        <Typography fontSize={30} component={"div"} color={"white"}>
          Your Plan:{" "}
          {data && data.user.plan !== null
            ? data?.user.plan.name
            : "*You have no plan!*"}
        </Typography>
        {data && data.user.plan !== null && (
          <>
            <Button
              variant="contained"
              color="secondary"
              size="small"
              sx={{ mx: 2 }}
              onClick={() => setOpenUpgradeModal(true)}
              disabled={data?.user.plan?.featuredMember}
            >
              Upgrade
            </Button>
            <Button
              variant="contained"
              color="error"
              size="small"
              sx={{ mx: 2 }}
              onClick={() => setOpenDeleteModal(true)}
            >
              Cancel
            </Button>
          </>
        )}
      </Box>
      <Grid
        container
        spacing={5}
        justifyContent={"center"}
        textAlign={"center"}
      >
        {data?.plans &&
          data?.plans?.map((val) => (
            <Grid item xs={4} justifyContent={"center"} display={"flex"}>
              <StyledCard
                featuedPostNumber={val.featuedPostNumber}
                name={val.name}
                postNumber={val.postNumber}
                price={val.price}
                id={val.id}
                onClick={() => val.id && mutate(val.id)}
                browseAndSaveAds={val.browseAndSaveAds}
                chatWithAdvertisers={val.chatWithAdvertisers}
                createGroupChats={val.createGroupChats}
                featuredMember={val.featuredMember}
                messageAdvertisers={val.messageAdvertisers}
                postVideoUrls={val.postVideoUrls}
                uploadVideos={val.uploadVideos}
                price90Days={val.price90Days}
                priceAnnual={val.priceAnnual}
                discountPercent={val.discountPercent}
                userPlan={data.user.plan !== null && data.user.plan.id}
              />
            </Grid>
          ))}
      </Grid>
      <SimpleBackdrop open={isLoading || MutateLoading} />
    </div>
  );
};

const StyledCard = ({
  featuedPostNumber,
  id,
  name,
  postNumber,
  price,
  onClick,
  userPlan,
  browseAndSaveAds,
  chatWithAdvertisers,
  createGroupChats,
  featuredMember,
  messageAdvertisers,
  postVideoUrls,
  uploadVideos,
  price90Days,
  priceAnnual,
  discountPercent,
}: PlansProps) => {
  // Declare an array with features
  const features = [
    { title: "Browse & Save ADs", value: browseAndSaveAds },
    { title: "Chat with Advertisers", value: chatWithAdvertisers },
    { title: "Message Advertisers", value: messageAdvertisers },
    { title: "Create Groups", value: createGroupChats },
    { title: "Featured Member", value: featuredMember },
    { title: "Post Video URLs", value: postVideoUrls },
    { title: "Upload Videos", value: uploadVideos },
  ];

  // Sort the features array
  const sortedFeatures = features.sort((a: any, b: any) => b.value - a.value);

  console.log(price90Days, priceAnnual, discountPercent);
  return (
    <Card
      sx={{
        minWidth: 345,
        minHeight: 300,
        alignItems: "center",
        display: "grid",
      }}
    >
      <CardContent>
        <Typography gutterBottom variant="h3" component="div">
          {name}
        </Typography>
        <Typography variant="h5" color="text.secondary">
          <Translate>Add featured post:</Translate> {featuedPostNumber}
        </Typography>
        <Typography variant="h5" color="text.secondary">
          <Translate>Add post:</Translate> {postNumber}
        </Typography>
        <Typography variant="h5" color="text.secondary">
          <Translate>Price:</Translate> {price}
        </Typography>
        <Typography variant="h5" color="text.secondary">
          <Translate>3 Months Price:</Translate> $
          {price90Days - price90Days * (discountPercent * 100)}
        </Typography>
        <Typography variant="h5" color="text.secondary">
          <Translate>Annual Price:</Translate> $
          {priceAnnual - priceAnnual * (discountPercent * 100)}
        </Typography>
        {sortedFeatures.map((feature) => (
          <Typography variant="h5" color="text.secondary">
            <Translate>{feature.title}</Translate>
            {feature.value ? <CheckCircle /> : <CloseRounded />}
          </Typography>
        ))}
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          color="secondary"
          onClick={onClick}
          disabled={id === userPlan}
          size="small"
        >
          <Translate>Subscribe</Translate>
        </Button>
      </CardActions>
    </Card>
  );
};

export default Plan;
