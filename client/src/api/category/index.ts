import axiosInstance from '../axiosInstance';

const URL = import.meta.env.VITE_LOCAL_DOAMIN;

export async function getCategories() {
  try {
    const { data } = await axiosInstance({
      method: 'GET',
      url: URL + '/categories',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function getPostCategories(id: string) {
  try {
    const { data } = await axiosInstance({
      method: 'GET',
      url: URL + `/categoryPosts/${id}`,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
}
