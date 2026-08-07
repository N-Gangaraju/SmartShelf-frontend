import axios from "axios";


const API = "http://localhost:8080/orders";

export const getMyOrders = (token) => {
    return axios.get(`${API}/myorders`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const cancelOrder = (orderId, token) => {
    return axios.put(
        `${API}/cancel/${orderId}`,
        {},
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
};
export const downloadInvoice = (orderId, token) => {

    return axios.get(
        `${API}/${orderId}/invoice`,
        {
            responseType: "blob",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

};
export const getAllOrders = (token) => {
    console.log("Token =", token);

    return axios.get(API, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};
export const updateOrderStatus = (orderId, status, token) => {
    return axios.put(
        `${API}/${orderId}/status`,
        { status },
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
};