import axios from "axios";
const BASE_URL =
  "https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=4a4f2552ae8f47b8bc80cee68cb27e1d";
export const getData = async () => {
  try {
    const response = await axios.get(`${BASE_URL}`);
    return response.data;
  } catch (error) {
    console.log(error.message);
  }
};
