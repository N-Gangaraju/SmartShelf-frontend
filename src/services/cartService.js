import axios from "axios";

const API = "http://localhost:8080/cart";

export const addToCart = (data, token) => {
    return axios.post(`${API}/add`, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const getCart = (token) => {
    return axios.get(`${API}/mycart`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const removeFromCart = (cartId, token) => {
    return axios.delete(`${API}/delete/${cartId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const updateQuantity = (cartId, quantity, token) => {
    return axios.put(
        `${API}/update/${cartId}`,
        { quantity },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
};

export const checkout = (token) => {
    return axios.post(
        `${API}/checkout`,
        {},
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
};