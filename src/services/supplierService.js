import axios from "axios";

const API = "http://localhost:8080/suppliers";

const token = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
    }
});

export const getAllSuppliers = () =>
    axios.get(API, token());

export const getSupplierById = (id) =>
    axios.get(`${API}/${id}`, token());

export const addSupplier = (supplier) =>
    axios.post(`${API}/add`, supplier, token());

export const updateSupplier = (id, supplier) =>
    axios.put(`${API}/update/${id}`, supplier, token());

export const deleteSupplier = (id) =>
    axios.delete(`${API}/delete/${id}`, token());