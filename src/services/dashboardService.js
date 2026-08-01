import axios from "axios";

const API = "http://localhost:8080/dashboard";

export const getDashboard = (token) =>
    axios.get(API, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

export const getRecentOrders = (token) =>
    axios.get(`${API}/recent-orders`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

export const getTopSellingProducts = (token) =>
    axios.get(`${API}/top-selling-products`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

export const getMonthlyRevenue = (token) =>
    axios.get(`${API}/monthly-revenue`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

export const getTopCustomers = (token) =>
    axios.get(`${API}/top-customers`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });