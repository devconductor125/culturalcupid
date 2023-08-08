import axios from 'axios';
// import { UserType } from "../../context/Auth";
const URL = import.meta.env.VITE_LOCAL_DOAMIN;
// || import.meta.env.VITE_LOCAL_DOAMIN
import axiosInstance from '../axiosInstance';

export const getToken = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    const { data } = await axios.post(`${URL}/sign`, {
      email,
      password,
    });

    return data;
  } catch (error) {
    throw new Error();
  }
};

export async function getUserInfo() {
  try {
    const { data } = await axiosInstance({
      method: 'GET',
      url: URL + '/user',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return data;
  } catch (error) {
    throw new Error('Error retrieving the user info');
  }
}

export async function Register({
  email,
  password,
  username,
  address,
  telephone,
  name,
  ip,
  memberType,
}: {
  email: string;
  password: string;
  username: string;
  address: string;
  telephone: string;
  name: string;
  ip: string;
  memberType: string;
}) {
  try {
    const { data } = await axios.post(`${URL}/user`, {
      email,
      password,
      username,
      address,
      telephone,
      name,
      ip,
      memberType,
    });

    return data;
  } catch (error) {
    throw new Error();
  }
}

export const registerWithGoogle = async () => {
  window.location.replace(`${URL}/auth/google`);
};
