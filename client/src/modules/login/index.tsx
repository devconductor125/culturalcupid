import { Box, TextField, Button, Typography, Alert } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext, UserType } from "../../context/Auth";
import { getToken, registerWithGoogle } from "../../api/auth";
import { useMutation } from "@tanstack/react-query";
import SimpleBackdrop from "../../common/backdrop";

const Login = () => {
  const naviagte = useNavigate();
  const authContext = useContext(AuthContext);
  const [credentials, setCredentials] = useState<{ [name: string]: string }>();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const { isLoading, mutate, isError } = useMutation(
    async () => {
      if (credentials && credentials.email && credentials.password) {
        const { email, password } = credentials;
        await getToken({ email, password })?.then((res) => {
          if (res && res.token) {
            console.log(res);
            localStorage.setItem("token", res.token);
            authContext?.handleUserName({
              email,
              isAdmin: res.isAdmin,
              adminType: res.adminType,
              id: res.id,
            } as UserType);
          }
        });
      }
    },
    {
      onSuccess: () => {
        naviagte("/");
      },
    }
  );

  const handleSignInWithGoogle = async () => {
    await registerWithGoogle();
  };

  return (
    <div>
      {isError && <Alert severity="error">Invalid Email or Password</Alert>}
      <Box
        justifyContent={"center"}
        display={"flex"}
        height={"100vh"}
        alignItems={"center"}
      >
        <Box
          justifyContent={"space-around"}
          display={"grid"}
          sx={{
            background: "#e5e3e3",
            width: "500px",
            height: "500px",
            borderRadius: "10px",
            alignItems: "center",
          }}
        >
          <Box>
            <Typography
              textAlign={"center"}
              component={"div"}
              fontFamily={"Parisienne"}
              fontSize={"40px"}
            >
              Login
            </Typography>
          </Box>
          <Box>
            <TextField
              fullWidth
              sx={{ background: "white" }}
              name="email"
              placeholder="email"
              onChange={handleChange}
            />
          </Box>
          <Box>
            <TextField
              fullWidth
              sx={{ background: "white" }}
              name="password"
              placeholder="password"
              type="password"
              onChange={handleChange}
            />
          </Box>
          <Box>
            <Button
              variant="contained"
              type="submit"
              fullWidth
              sx={{ background: "#FF6063", color: "white", fontWeight: 700 }}
              onClick={() => mutate()}
            >
              Login
            </Button>
            <Button
              variant="contained"
              fullWidth
              sx={{
                background: "#FF6063",
                color: "white",
                fontWeight: 700,
                marginY: 2,
              }}
              onClick={handleSignInWithGoogle}
            >
              {" "}
              Sign in with google{" "}
            </Button>
            <Typography>
              Create an account here <Link to="/register">Register</Link>
            </Typography>
          </Box>
        </Box>
        <SimpleBackdrop open={isLoading} />
      </Box>
    </div>
  );
};

export default Login;
