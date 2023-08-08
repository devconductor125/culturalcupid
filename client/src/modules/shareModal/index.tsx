import { Modal, Box, Typography, TextField, Button } from "@mui/material";
import { ModalContainer } from "./styles";
import twitter from "../../assets/icons/twitterColored.svg";
import facebook from "../../assets/icons/facebookColored.svg";
import pinterest from "../../assets/icons/pinterestColored.svg";
import linkedIn from "../../assets/icons/linkedInColored.svg";
import whatsapp from "../../assets/icons/whatsappColored.svg";
import telegram from "../../assets/icons/telegramColored.svg";
import flag from "../../assets/icons/flag.svg";
import group from "../../assets/icons/group.svg";

interface ShareModalProps {
  open: boolean;
  onClose: (flag: boolean) => void;
}

const ShareModal = ({ onClose, open }: ShareModalProps) => {
  return (
    <div>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <ModalContainer>
          <Typography
            component={"div"}
            textAlign={"center"}
            color={"white"}
            paddingBottom={5}
            fontWeight={700}
          >
            Share the post on
          </Typography>
          <Box marginY={2} display={"flex"} justifyContent={"space-around"}>
            <Box
              borderRadius={20}
              display={"flex"}
              width={50}
              height={50}
              sx={{ background: "#EFEFEF" }}
              textAlign={"center"}
              justifyContent={"center"}
            >
              <Typography width={"20px"} component={"img"} src={twitter} />
            </Box>
            <Box
              borderRadius={20}
              display={"flex"}
              width={50}
              height={50}
              sx={{ background: "#EFEFEF" }}
              textAlign={"center"}
              justifyContent={"center"}
            >
              <Typography width={"20px"} component={"img"} src={facebook} />
            </Box>
            <Box
              borderRadius={20}
              display={"flex"}
              width={50}
              height={50}
              sx={{ background: "#EFEFEF" }}
              textAlign={"center"}
              justifyContent={"center"}
            >
              <Typography width={"20px"} component={"img"} src={pinterest} />
            </Box>
            <Box
              borderRadius={20}
              display={"flex"}
              width={50}
              height={50}
              sx={{ background: "#EFEFEF" }}
              textAlign={"center"}
              justifyContent={"center"}
            >
              <Typography width={"20px"} component={"img"} src={whatsapp} />
            </Box>
            <Box
              borderRadius={20}
              display={"flex"}
              width={50}
              height={50}
              sx={{ background: "#EFEFEF" }}
              textAlign={"center"}
              justifyContent={"center"}
            >
              <Typography width={"20px"} component={"img"} src={linkedIn} />
            </Box>
            <Box
              borderRadius={20}
              display={"flex"}
              width={50}
              height={50}
              sx={{ background: "#EFEFEF" }}
              textAlign={"center"}
              justifyContent={"center"}
            >
              <Typography width={"20px"} component={"img"} src={telegram} />
            </Box>
          </Box>
          <Box marginY={2}>
            <TextField
              fullWidth
              multiline
              maxRows={4}
              sx={{ background: "#EFEFEF" }}
              InputProps={{
                style: {
                  height: 105,
                },
              }}
            />
          </Box>
          <Box marginY={2}>
            <Typography component={"div"} fontWeight={700} marginY={2}>
              share the post on
            </Typography>
            <Box display={"flex"} justifyContent={"space-around"}>
              <Box
                sx={{ width: "177px", height: "56px", background: "#EFEFEF" }}
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <img src={flag} alt="flag" style={{ marginRight: 2 }} />
                Page
              </Box>
              <Box
                sx={{ width: "177px", height: "56px", background: "#EFEFEF" }}
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <img src={group} alt="flag" style={{ marginRight: 2 }} />
                Group
              </Box>
            </Box>
          </Box>
          <Box
            width={"100%"}
            justifyContent={"end"}
            display={"flex"}
            height={"25px"}
          >
            <Button
              variant="contained"
              sx={{
                borderRadius: "10px",
                background: "#FF5E62",
                fontWeight: 700,
                textTransform: "capitalize",
                fontSize: "12px",
              }}
            >
              Share
            </Button>
          </Box>
        </ModalContainer>
      </Modal>
    </div>
  );
};

export default ShareModal;
