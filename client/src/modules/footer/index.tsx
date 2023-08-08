import { Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import Logo from "../../assets/Logo.png";
import { EnterEmail, SendEmailIcon } from "./styles";
import sendEmail from "../../assets/icons/sendEmail.svg";

const Footer = ({ content }: any) => {
  return (
    <Grid
      container
      p={5}
      height={"100%"}
      bgcolor={"white"}
      sx={{ marginBlockStart: "100px" }}
      rowGap={5}
    >
      <Grid
        container
        md={3}
        xs={12}
        color={"black"}
        direction={"column"}
        gap={2}
        textAlign={"center"}
      >
        <Grid item>
          <Typography
            component={"div"}
            fontSize={24}
            fontFamily={"Heebo"}
            marginBottom={5}
          >
            <img
              src={content?.logo}
              alt="Logo"
              style={{ maxWidth: "200px", maxHeight: "200px" }}
            />
          </Typography>
        </Grid>
        <Grid item>
          <Typography component={"div"} fontSize={16} fontFamily={"Heebo"}>
            Copyright © 2023 {content?.siteName}
          </Typography>
        </Grid>
        <Grid item>
          {/* <Typography component={"div"} fontSize={16} fontFamily={"Heebo"}>
            icons
          </Typography> */}
        </Grid>
      </Grid>
      <Grid
        container
        xs={6}
        md={3}
        color={"black"}
        direction={"column"}
        gap={2}
      >
        <Grid item>
          <Typography component={"div"} fontSize={24} fontFamily={"Heebo"}>
            USEFUL LINKS
          </Typography>
        </Grid>
        <Grid item>
          <Typography component={"div"} fontSize={16} fontFamily={"Heebo"}>
            <Link to={"/"}>Home</Link>
          </Typography>
        </Grid>
        <Grid item>
          <Typography component={"div"} fontSize={16} fontFamily={"Heebo"}>
            <Link to={"/about"}>About</Link>
          </Typography>
        </Grid>
        <Grid item>
          <Typography component={"div"} fontSize={16} fontFamily={"Heebo"}>
            <Link to={"/"}>Package</Link>
          </Typography>
        </Grid>
        <Grid item>
          <Typography component={"div"} fontSize={16} fontFamily={"Heebo"}>
            <Link to={"/"}>Blog</Link>
          </Typography>
        </Grid>
      </Grid>
      <Grid
        container
        xs={6}
        md={3}
        color={"black"}
        direction={"column"}
        gap={2}
      >
        <Grid item>
          <Typography component={"div"} fontSize={24}>
            QUICK SEARCH
          </Typography>
        </Grid>
        <Grid item>
          <Typography component={"div"} fontSize={16} fontFamily={"Heebo"}>
            <Link to={"/"}>Faq</Link>
          </Typography>
        </Grid>
        <Grid item>
          <Typography component={"div"} fontSize={16} fontFamily={"Heebo"}>
            <Link to={"/contact"}>Contact</Link>
          </Typography>
        </Grid>
        <Grid item>
          <Typography component={"div"} fontSize={16} fontFamily={"Heebo"}>
            <Link to={"/"}>Terms & Conditions</Link>
          </Typography>
        </Grid>
        <Grid item>
          <Typography component={"div"} fontSize={16} fontFamily={"Heebo"}>
            <Link to={"/policies/privacy-policy"}>Privacy policy</Link>
          </Typography>
        </Grid>
      </Grid>
      <Grid
        container
        xs={12}
        md={3}
        color={"black"}
        direction={"column"}
        gap={2}
      >
        <Grid item>
          <Typography component={"div"} fontSize={24}>
            SUBSCRIBE NEWSLETTER
          </Typography>
        </Grid>
        <Grid item>
          <Typography component={"div"} fontSize={16} fontFamily={"Heebo"}>
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
          </Typography>
        </Grid>
        <Grid item>
          <Typography
            component={"div"}
            display={"flex"}
            fontSize={16}
            fontFamily={"Heebo"}
          >
            <EnterEmail>Enter email</EnterEmail>
            <SendEmailIcon>
              <img src={sendEmail} alt="" />
            </SendEmailIcon>
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Footer;
