import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  Select,
  Menu,
  MenuItem,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext, UserType } from '../../context/Auth';
import { Register } from '../../api/auth';
import { useMutation } from '@tanstack/react-query';
import SimpleBackdrop from '../../common/backdrop';
import axios from 'axios';
const URL = import.meta.env.VITE_LOCAL_DOAMIN;

const Login = () => {
  const naviagte = useNavigate();
  const [credentials, setCredentials] = useState<{ [name: string]: string }>();
  const [ip, setIp] = useState<string>('');
  const authContext = useContext(AuthContext);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const { isLoading, mutate, isError } = useMutation(async () => {
    if (
      credentials &&
      credentials.email &&
      credentials.password &&
      credentials.username &&
      credentials.address &&
      credentials.telephone &&
      credentials.name &&
      credentials.memberType
    ) {
      const {
        email,
        password,
        username,
        address,
        telephone,
        name,
        memberType,
      } = credentials;
      await Register({
        email,
        password,
        username,
        address,
        telephone,
        name,
        ip,
        memberType,
      })
        ?.then((res) => {
          if (res && res.token) {
            localStorage.setItem('token', res.token);
            authContext?.handleUserName({
              email,
              username,
              isAdmin: res.isAdmin,
              adminType: res.adminType,
              address,
              telephone,
              name,
              ip,
              id: res.id,
            } as UserType);
          }
        })
        .then(() => naviagte('/'));
    }
  });

  useEffect(() => {
    (async () => {
      await axios.get(URL + `/get-ip`).then((res) => {
        setIp(res.data?.ip);
      });
    })();
  }, []);

  console.log(ip);

  return (
    <div>
      {isError && <Alert severity="error">This user alraedy registerd</Alert>}
      <Box
        justifyContent={'center'}
        display={'flex'}
        height={'120vh'}
        alignItems={'center'}
      >
        {/* <form onSubmit={handleOnSubmit}> */}
        <Box
          justifyContent={'space-around'}
          display={'grid'}
          sx={{
            background: '#e5e3e3',
            width: '500px',
            height: '800px',
            borderRadius: '10px',
            alignItems: 'center',
          }}
        >
          <Box>
            <Typography
              textAlign={'center'}
              component={'div'}
              fontFamily={'Parisienne'}
              fontSize={'40px'}
            >
              Register
            </Typography>
          </Box>
          <Box>
            <TextField
              fullWidth
              sx={{ background: 'white' }}
              name="name"
              placeholder="Name"
              onChange={handleChange}
            />
          </Box>
          <Box>
            <TextField
              fullWidth
              sx={{ background: 'white' }}
              name="username"
              placeholder="username"
              onChange={handleChange}
            />
          </Box>
          <Box>
            <TextField
              fullWidth
              sx={{ background: 'white' }}
              name="address"
              placeholder="Address"
              onChange={handleChange}
            />
          </Box>
          <Box>
            <TextField
              fullWidth
              sx={{ background: 'white' }}
              name="telephone"
              placeholder="Telephone"
              onChange={handleChange}
            />
          </Box>
          <Box>
            <Select
              name="memberType"
              id="memberType"
              onChange={handleChange as any}
              sx={{ width: '100%' }}
            >
              <MenuItem value={'Individual'}>Individual</MenuItem>
              <MenuItem value={'Business'}>Business</MenuItem>
            </Select>
          </Box>
          <Box>
            <TextField
              fullWidth
              sx={{ background: 'white' }}
              name="email"
              placeholder="email"
              onChange={handleChange}
            />
          </Box>
          <Box>
            <TextField
              fullWidth
              sx={{ background: 'white' }}
              name="password"
              placeholder="password"
              type="password"
              onChange={handleChange}
            />
          </Box>
          <Box>
            <TextField
              fullWidth
              sx={{ background: 'white' }}
              name="confirmPassword"
              placeholder="confirm password"
              type="password"
              onChange={handleChange}
            />
          </Box>
          <Box>
            <Button
              variant="contained"
              onClick={() => mutate()}
              type="submit"
              fullWidth
              sx={{ background: '#FF6063', color: 'white', fontWeight: 700 }}
            >
              Register
            </Button>
          </Box>
          <Typography>
            Alraedy have an account ? <Link to="/login">Login</Link>
          </Typography>
        </Box>
        {/* </form> */}

        <SimpleBackdrop open={isLoading} />
      </Box>
    </div>
  );
};

export default Login;
