import axios from "axios";

const API = "http://localhost:8080/categories";

export const getAllCategories = async () => {
  return await axios.get(API);
};