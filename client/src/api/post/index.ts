import axios from 'axios';
// import { UserType } from "../../context/Auth";
const URL = import.meta.env.VITE_LOCAL_DOAMIN;
// || import.meta.env.VITE_LOCAL_DOAMIN

import axiosInstance from '../axiosInstance';

export async function createPost(data: any) {
  try {
    await axiosInstance({
      method: 'POST',
      url: URL + '/post',
      data: data,
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((r) => {
        setTimeout(() => {
          (window as Window).location.reload();
        }, 1000);
        return r?.data;
      })
      .catch((response) => {
        alert(`${response?.response?.data?.message}`);
      });
  } catch (error) {
    console.log(error);
  }
}

export async function uploadImages({ formData }: { formData: FormData }) {
  try {
    const { data } = await axiosInstance({
      method: 'POST',
      url: URL + '/blob',
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function getUserPost() {
  try {
    const { data } = await axiosInstance({
      method: 'GET',
      url: URL + '/post',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function getAllPosts() {
  try {
    const { data } = await axiosInstance({
      method: 'GET',
      url: URL + '/posts',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
}
