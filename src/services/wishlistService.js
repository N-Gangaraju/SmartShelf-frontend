import axios from "axios";

const API = "http://localhost:8080/wishlist";

export const addToWishlist = (data, token) => {
    return axios.post(`${API}/add`, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const getWishlist = (token) => {
    return axios.get(`${API}/myWishlist`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const removeWishlist = (id, token) => {
    return axios.delete(`${API}/delete/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const moveToCart = (id, token) => {
    return axios.post(
        `${API}/move-to-cart/${id}`,
        {},
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
};