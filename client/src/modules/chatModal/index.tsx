import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { ModalContainer, InputField } from "./styles";
import placeholder from "../../assets/placeholder.png";
import { Button } from "@mui/material";

interface ChatModalProps {
  open: boolean;
  onClose: (flag: boolean) => void;
}

const ChatModal = ({ open, onClose }: ChatModalProps) => {
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
            Create a chat group
          </Typography>
          <Typography component={"div"}>
            <Box marginY={2}>
              <Typography component={"div"} fontWeight={700} fontSize={"15px"}>
                Name
              </Typography>
              <InputField />
            </Box>
            <Box marginY={2}>
              <Typography component={"div"} fontWeight={700} fontSize={"15px"}>
                Add participant (0)
              </Typography>
              <InputField />
            </Box>
            <Box marginY={2}>
              <Typography component={"div"} fontWeight={700} fontSize={"15px"}>
                Image
              </Typography>
              <img src={placeholder} alt="placeholderImage" />
            </Box>
          </Typography>
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
              Add a post
            </Button>
          </Box>
        </ModalContainer>
      </Modal>
    </div>
  );
};

export default ChatModal;
