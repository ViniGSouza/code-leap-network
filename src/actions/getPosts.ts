import axios from "axios";

export const getPosts = async (url?: string) => {
  try {
    const response = await axios.get(url || 'https://dev.codeleap.co.uk/careers/');
    return response.data;
  } catch (error) {
    console.error(error);
  }
};