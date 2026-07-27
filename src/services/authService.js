import axios from "axios";

const API = "http://localhost:8080/auth";

export const login = (data) => {
    return axios.post(`${API}/login`, data);
};

export const verifyOtp = (data) => {
    return axios.post(`${API}/verify-otp`, data);
};

export const forgotPassword = (data) => {
    return axios.post(`${API}/forgot-password`, data);
};

export const resetPassword = (data) => {
    return axios.post(`${API}/reset-password`, data);
};