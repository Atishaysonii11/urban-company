import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

const API_FETCHER = async ({
  url,
  method = "GET",
  data = {},
  params = {},
  headers = {},
}) => {
  try {
    const config = {
      url,
      method,
      data,
      params,
      headers,
    };
    const response = await axiosInstance(config);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export default API_FETCHER;
