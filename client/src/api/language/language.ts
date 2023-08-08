import axiosInstance from "../axiosInstance";

const URL = import.meta.env.VITE_LOCAL_DOAMIN;

export async function getLanguages() {
  try {
    const { data } = await axiosInstance({
      method: "GET",
      url: URL + "/language/all",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
}
