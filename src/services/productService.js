import axios from "axios";

const API = "http://localhost:8080/products";


// Get all products
export const getAllProducts = () =>
    axios.get(API);


// Get product by category
export const getProductsByCategory = (category) =>
    axios.get(`${API}/search/category?category=${category}`);


// Get product by id
export const getProductById = (id) =>
    axios.get(`${API}/${id}`);


// Search products by keyword
export const searchProducts = (keyword) =>
    axios.get(`${API}/search?keyword=${keyword}`);


// Search products by brand
export const searchByBrand = (brand) =>
    axios.get(`${API}/search/brand?brand=${brand}`);


// Search products by category
export const searchByCategory = (category) =>
    axios.get(`${API}/search/category?category=${category}`);


// Search products by price range
export const searchByPrice = (min, max) =>
    axios.get(`${API}/search/price?min=${min}&max=${max}`);


// Filter by brand and category
export const filterProducts = (brand, category) =>
    axios.get(`${API}/filter?brand=${brand}&category=${category}`);


// Sort price low to high
export const sortPriceLowToHigh = () =>
    axios.get(`${API}/sort/price/asc`);


// Sort price high to low
export const sortPriceHighToLow = () =>
    axios.get(`${API}/sort/price/desc`);

export const getProductsPage = (page, size) =>
    axios.get(`${API}/page?page=${page}&size=${size}`);