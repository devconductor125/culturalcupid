import axios from "axios";
// import { UserType } from "../../context/Auth";
const URL = import.meta.env.VITE_DEPLOYED_DOMAIN;
// || import.meta.env.VITE_LOCAL_DOAMIN

import axiosInstance from "../axiosInstance";

export const gelAllPlans = async () => {
  try {
    const { data } = await axiosInstance({
      method: "GET",
      url: URL + "/plan",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const Subscribe = async (planId: string) => {
  try {
    const { data } = await axiosInstance({
      method: "POST",
      url: URL + "/subscribe",
      data: {
        planId,
      },
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    throw new Error("No Enogh Balance");
  }
};
