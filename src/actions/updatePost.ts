import axios from "axios";

export const updatePost = async (id: string, title: string, content: string) => {
  try {
    const response = await axios.patch(`https://dev.codeleap.co.uk/careers/${id}/`, {
      title,
      content,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}