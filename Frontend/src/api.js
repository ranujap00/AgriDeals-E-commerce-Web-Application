import axios from "axios"

const API_URL = "http://localhost:5000/api";

export const getAllItems = async () => {
    return axios.get(`${API_URL}/items`).then((res) => res.data);
}

export const getAllOrders = async () => {
    return axios.get(`${API_URL}/orders`).then((res) => res.data);
}

export const getItems = async (category) => {
    let convertedCategory = category.replace(/ /g, "_").toLowerCase();
    if (category !== "all") {
        return await axios.get(`${API_URL}/category/${convertedCategory}`).then((res) => res.data);
    }
    return await axios.get(`${API_URL}/items`).then((res) => res.data);
}

export const search = async (query) => {
    return axios.get(`${API_URL}/items/search/${query}`).then((res) => res.data);
}

export const placeOrder = async (order) => {
    return axios.post(`${API_URL}/orders/`, { ...order }).then((res) => res.data);
}