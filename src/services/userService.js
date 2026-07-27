import axios from "axios";

const USER_API = "http://localhost:8080/users";
const AUTH_API = "http://localhost:8080/auth";

// Register
export const registerUser = (user) => {
    return axios.post(`${USER_API}/register`, user);
};

// Login
export const loginUser = (loginData) => {
    return axios.post(`${AUTH_API}/login`, loginData);
};

export const verifyOtp=(data)=>{
    return axios.post(`${AUTH_API}/verify-otp`,data);
};