import axios from "axios";

export const deletePost = async (id: string) => {
  try {
    const response = await axios.delete(`https://dev.codeleap.co.uk/careers/${id}/`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}