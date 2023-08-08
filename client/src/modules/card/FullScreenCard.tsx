import { CardConatiner, UtilsText } from "./styles";
import { Box, Typography, useTheme } from "@mui/material";
import LeftArrow from "../../assets/icons/LeftArrow.svg";
import RightArrow from "../../assets/icons/RightArrow.svg";
import Chat from "../../assets/icons/chat.svg";
import Inbox from "../../assets/icons/inbox.svg";
import Message from "../../assets/icons/message.svg";
import Save from "../../assets/icons/save.svg";
import Share from "../../assets/icons/share.svg";
import SwipeableViews from "react-swipeable-views";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/Auth";
import UserProfileModal from "./UserProfilePopUp";
import Translate from "../../common/translate/Translate";

type ImageProps = {
  label: string;
  src: string;
};

export type CardProps = {
  images: string;
  title: string;
  location: string;
  description: string;
  user: any;
};

type DataProps = {
  data: CardProps;
  setMessageModal: (flag: boolean) => void;
  setShareModal: (flag: boolean) => void;
  setChatModal: (flag: boolean) => void;
  setCardDetaild?: (card: CardProps) => void;
  setReceiver?: any;
  featured?: boolean;
  onCardClick?: any;
  onClose?: any;
};

const FullScreenCard = ({
  data,
  setChatModal,
  setMessageModal,
  setShareModal,
  setCardDetaild,
  setReceiver,
  featured,
  onCardClick,
  onClose,
}: DataProps) => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const theme = useTheme();
  const [userId, setUserId] = useState<any>(null);
  const images = JSON.parse(data?.images);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => {
      if (images.length - 1 > activeStep) {
        return prevActiveStep + 1;
      } else {
        return prevActiveStep;
      }
    });
    console.log(activeStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const handleStepChange = (step: number, imgs: any) => {
    setActiveStep(step);
  };
  const authContext = useContext(AuthContext);
  const [fullScreen, setFullScreen] = useState(true);
  console.log(activeStep);
  return (
    <CardConatiner
      onClick={() => onCardClick && onCardClick(data)}
      style={{
        position: "fixed",
        width: "90vw",
        height: "90vh",
        top: "0",
        left: "5%",
        zIndex: "50",
        overflow: "auto",
        background: "white",
      }}
    >
      <Box
        sx={{ position: "relative" }}
        // onClick={() => setFullScreen(!featured && true)}
      >
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={activeStep}
          onChangeIndex={handleStepChange}
          enableMouseEvents
        >
          {images?.map((step: any, index: any) => {
            return (
              <div key={index}>
                <>
                  {!step?.type?.includes("video") ? (
                    <img
                      src={step.url}
                      width={fullScreen ? "100%" : 345}
                      height={fullScreen ? "500px" : 255}
                      alt="faceImage"
                      style={{ borderRadius: "22px 22px 0px 0px" }}
                    />
                  ) : (
                    <video
                      width={fullScreen ? "100%" : 345}
                      height={fullScreen ? "500px" : 255}
                      autoPlay
                      muted
                      loop
                      style={{ borderRadius: "22px 22px 0px 0px" }}
                    >
                      <source src={step.url} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  )}
                </>
              </div>
            );
          })}
          {/* <img src={ImageOne} width={345} height={255} alt="faceImage" /> */}
        </SwipeableViews>
        <Box
          sx={{
            display: "flex",
            position: "absolute",
            top: 0,
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <Typography
            component={"button"}
            onClick={handleBack}
            sx={{
              height: "255px",
              justifyContent: "center",
              paddingTop: "40px",
              background: "#0000006b",
              borderRadius: "20px 0px 0px 0px",
            }}
            disabled={activeStep === 0}
          >
            <img src={LeftArrow} alt="LeftArrow" height={30} />
          </Typography>
          <Typography
            component={"button"}
            onClick={handleNext}
            sx={{
              height: "255px",
              justifyContent: "center",
              paddingTop: "40px",
              background: "#0000006b",
              borderRadius: "0px 20px 0px 0px",
            }}
            disabled={activeStep === images.length}
          >
            <img src={RightArrow} alt="RightArrow" height={30} />
          </Typography>
        </Box>
      </Box>
      <Box>
        <Typography
          component={"div"}
          fontSize={"20px"}
          fontWeight={600}
          textAlign={"center"}
          justifyContent={"center"}
        >
          {data.title || ""}
        </Typography>
        <Typography
          component={"div"}
          fontSize={"13px"}
          fontWeight={600}
          textAlign={"center"}
          justifyContent={"center"}
        >
          {data.location}
        </Typography>
        <Typography
          component={"div"}
          fontSize={"13px"}
          p={1}
          fontWeight={600}
          textAlign={"center"}
          justifyContent={"center"}
        >
          {data.description}
        </Typography>
      </Box>
      <Box
        sx={{
          width: "100%",
          background: "#FF6063",
          borderRadius: "0px 0px 20px 20px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            paddingY: "10px",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            onClick={() => setCardDetaild && setCardDetaild(data)}
            sx={{
              color: "white",
              paddingLeft: "30px",
              fontSize: "11px",
              fontWeight: 700,
              margin: "auto 0px auto 0px",
            }}
          >
            <Translate>Details</Translate>
          </Box>
          <Box
            sx={{
              borderRadius: "20px",
              fontSize: "11px",
              border: "1px solid white",
              marginLeft: "70px",
              color: "white",
              padding: "6px",
              fontWeight: 700,
            }}
            onClick={() => setUserId(data?.user?.id)}
          >
            <Translate>Visit profile</Translate>
          </Box>
          <Box
            sx={{
              margin: "auto 0px auto 76px",
              color: "white",
              fontWeight: 700,
              fontSize: "11px",
            }}
          >
            <Translate>Report</Translate>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            color: "white",
            fontSize: "15px",
            fontWeight: 700,
            padding: "0 10px",
          }}
        >
          <Box>
            <img src={Message} alt="" />
            <UtilsText
              onClick={() => {
                if (!(data?.user?.id === authContext?.user?.id)) {
                  setMessageModal(true);
                  setReceiver(data?.user);
                }
              }}
            >
              <Translate>Message</Translate>
            </UtilsText>
          </Box>
          <Box>
            <img src={Chat} alt="" />
            <UtilsText onClick={() => setChatModal(true)}>
              <Translate>Chat</Translate>
            </UtilsText>
          </Box>
          <Box>
            <img src={Share} alt="" />
            <UtilsText onClick={() => setShareModal(true)}>
              <Translate>Share</Translate>
            </UtilsText>
          </Box>
          <Box>
            <img src={Inbox} alt="" />
            <UtilsText>
              <Translate>Contact</Translate>
            </UtilsText>
          </Box>
          <Box>
            <img src={Save} alt="" />
            <UtilsText>
              <Translate>Save</Translate>
            </UtilsText>
          </Box>
        </Box>
      </Box>
      {fullScreen && (
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            zIndex: "9999",
          }}
        >
          <Translate>Exit Full Screen</Translate>
        </button>
      )}

      <UserProfileModal
        open={userId}
        onClose={() => setUserId(null)}
        userId={userId}
      />
    </CardConatiner>
  );
};

export default FullScreenCard;
