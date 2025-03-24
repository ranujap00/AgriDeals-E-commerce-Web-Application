import axios from "axios"

const API_URL = "http://localhost:5000/api";

export const getAllItems = async () => {
    return axios.get(`${API_URL}/items`).then((res) => res.data);
}

export const getAllOrders = async () => {
    return axios.get(`${API_URL}/orders`).then((res) => res.data);
}