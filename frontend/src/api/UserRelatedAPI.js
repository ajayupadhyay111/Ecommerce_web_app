import { API } from "./axios";

export const login = (data) => API.post("/login", data);
export const registerUser = (data) => API.post("/register", data);
export const refreshToken = () => API.post("/refresh");
export const googleAuth = (code)=>API.get(`/google?code=${code}`)
export const getProfile = ()=>API.get("/getUserProfile")
export const logoutUser = ()=>API.post("/logout")   
export const sendMailOnUserEmail = (email)=>API.post("/sendEmailToResetPassword",{email})