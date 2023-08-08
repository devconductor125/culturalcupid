import axiosInstance from "../axiosInstance";

const URL = import.meta.env.VITE_LOCAL_DOAMIN;

export async function getCountries() {
  try {
    const { data } = await axiosInstance({
      method: "GET",
      url: URL + "/country/all",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
}
