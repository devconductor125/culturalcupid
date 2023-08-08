import { Modal, Typography } from "@mui/material";
import { ModalContainer } from "./styles";
import { CardProps } from "../card";

interface AdInfoProps {
  open: boolean;
  onClose: (flag: boolean) => void;
  cardDetails: CardProps | undefined;
}

const AdInfo = ({ onClose, open, cardDetails }: AdInfoProps) => {
  return (
    <Modal open={open} onClose={onClose}>
      <ModalContainer>
        <Typography
          component={"div"}
          textAlign={"center"}
          color={"white"}
          paddingBottom={5}
          fontWeight={700}
        >
          AD Details
        </Typography>
        { cardDetails && 
          <>
              <Typography component={"div"} textAlign={"center"}>{cardDetails.title}</Typography>
              <Typography component={"div"}>{cardDetails.location}</Typography>
              <Typography component={"div"}>{cardDetails.description}</Typography>
          </> 
        }
      </ModalContainer>
    </Modal>
  );
};

export default AdInfo;
