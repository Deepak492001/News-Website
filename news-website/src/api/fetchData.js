import axios from "axios";
const BASE_URL =

export const getData = async () => {
  try {
    const response = await axios.get(`${BASE_URL}`);
    return response.data;
  } catch (error) {
    console.log(error.message);
  }
};
