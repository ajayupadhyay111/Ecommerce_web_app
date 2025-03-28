import axios from "axios";
import toast from "react-hot-toast";

let accessToken = localStorage.getItem("accessToken")

export const API = axios.create({
  baseURL: "http://localhost:4000/api",
  withCredentials: true,
  headers:{
     "Authorization":`Bearer ${accessToken}`
  }
});

API.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 403 && error.response?.data.refresh) {
      try {
        // Call refresh token API
        const refreshRes = await axios.get(
          "http://localhost:4000/api/refreshToken",
          {
            withCredentials: true,
          }
        );

        // Update token & retry  failed request
        localStorage.setItem("accessToken",refreshRes.data.accessToken)
        error.config.headers.Authorization = `Bearer ${refreshRes.data.accessToken}`;
        return axios(error.config);
      } catch (error) {
        console.log("error in refresh token",error)
        if(error.response.status === 403){
          toast.error("Login first")
        }
      }
    }
    return Promise.reject(error);
  }
);
