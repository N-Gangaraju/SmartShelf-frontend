import axios from "axios";

const API = "http://localhost:8080/products";

export const getAllProducts = () => axios.get(API);

export const getProductsByCategory = (category) =>
    axios.get(`${API}/search/category?category=${category}`);

export const getProductById = (id) =>
    axios.get(`${API}/${id}`);