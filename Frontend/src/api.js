import axios from "axios"

const API_URL = "http://localhost:5000/api";

export const getAllItems = async () => {
    return axios.get(`${API_URL}/items`).then((res) => res.data);
}

export const getAllOrders = async () => {
    return axios.get(`${API_URL}/orders`).then((res) => res.data);
}

export const getItems = async (category) => {
    const Category = category.replaceAll(" ", "_").toLowerCase();
    if (category !== "all") {
        return axios.get(`${API_URL}/category/${Category}`).then((res) => res.data);
    }
    return axios.get(`${API_URL}/items`).then((res) => res.data);
}