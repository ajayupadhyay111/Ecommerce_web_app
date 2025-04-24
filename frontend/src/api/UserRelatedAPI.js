import { API } from "./axios";

export const login = (data) => API.post("/login", data);
export const registerUser = (data) => API.post("/register", data);
export const refreshToken = () => API.post("/refresh");
export const googleAuth = (code) => API.get(`/google?code=${code}`);
export const getProfile = () => API.get("/getUserProfile");
export const logoutUser = () => API.post("/logout");
export const sendMailOnUserEmail = (email) =>
  API.post("/sendEmailToResetPassword", { email });

// user product related api
export const getProductById = (id) => API.get(`/product/${id}`);
export const getProductsForFilterPage = (category, size, price, sort) =>
  API.get(
    `/product/filterProduct?category=${category}&size=${size}&price=${price}&sort=${sort}`
  );

// cart related routes
export const getCartPorducts = () => API.get("/cart/getCartProducts");
export const addProductInCart = (data) => API.post(`/cart/addToCart`, data);
