import { CardConatiner } from "./styles";
import { Box, Button, Typography } from "@mui/material";
import AddSpace from "../../assets/adSpace.png";
import Translate from "../../common/translate/Translate";

interface AdSpaceCardProps {
  openPostModel: () => void;
}

const StyledAdSpaceCard = ({ openPostModel }: AdSpaceCardProps) => {
  return (
    <CardConatiner>
      <Box sx={{ position: "relative" }}>
        <Typography
          component={"div"}
          sx={{
            position: "absolute",
            textAlign: "center",
            width: "100%",
            top: "170px",
          }}
        >
          <Typography
            sx={{ fontWeight: 600, fontSize: "20px", color: "white" }}
          >
            <Translate>Ad Space avaliable</Translate>
          </Typography>
          <Button
            variant="contained"
            sx={{
              background: "white",
              color: "black",
              fontSize: "20px",
              fontWeight: 600,
              textTransform: "capitalize",
            }}
            onClick={openPostModel}
          >
            <Translate>Click here</Translate>
          </Button>
        </Typography>
        <img
          src={AddSpace}
          width={345}
          height={255}
          alt="faceImage"
          style={{ borderRadius: "22px 22px 0px 0px" }}
        />
        {/* <img src={ImageOne} width={345} height={255} alt="faceImage" /> */}
      </Box>
      <Box>
        <Typography
          component={"div"}
          display={"flex"}
          fontSize={"25px"}
          fontWeight={600}
          textAlign={"center"}
          justifyContent={"center"}
          paddingTop={"45px"}
        >
          <Translate>AD space Avaliable</Translate>
        </Typography>
      </Box>
    </CardConatiner>
  );
};

export default StyledAdSpaceCard;
