import axios from "axios";

const BASE_URL = "http://localhost:8080/reviews";

export const addReview = (review, token) => {
    return axios.post(
        `${BASE_URL}/add`,
        review,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
};

export const getReviewsByProduct = (productId) => {
    return axios.get(
        `${BASE_URL}/product/${productId}`
    );
};

export const deleteReview = (reviewId, token) => {
    return axios.delete(
        `${BASE_URL}/delete/${reviewId}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
};

export const updateReview = (reviewId, review, token) => {
    return axios.put(
        `${BASE_URL}/update/${reviewId}`,
        review,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
};

export const getAverageRating = (productId) => {
    return axios.get(
        `${BASE_URL}/product/${productId}/rating`
    );
};

export const getAllReviews = (token) => {

    return axios.get(
        BASE_URL,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

};