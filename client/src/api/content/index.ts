import axios from "axios";
// import { UserType } from "../../context/Auth";
const URL = import.meta.env.VITE_LOCAL_DOAMIN;



export async function getStaticContent() {
  try {
    console.log("asdfasdfasdfasdfasdfasdf", URL)
    const { data } = await axios.get(`${URL}/admin/static-content`);
    return data;
  } catch (error) {
    console.log(error);
  }
}
