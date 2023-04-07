import axios from "axios";

export const createPost = async (username: string, title: string, content: string) => {
  try {
    const response = await axios.post(`https://dev.codeleap.co.uk/careers/`, {
      username,
      title,
      content,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}