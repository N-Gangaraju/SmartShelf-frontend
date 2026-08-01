import axios from "axios";

const API = "http://localhost:8080/categories";

const token = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
    }
});

export const getAllCategories = () =>
    axios.get(API);

export const addCategory = (category) =>
    axios.post(`${API}/add`, category, token());

export const updateCategory = (id, category) =>
    axios.put(`${API}/update/${id}`, category, token());

export const deleteCategory = (id) =>
    axios.delete(`${API}/delete/${id}`, token());