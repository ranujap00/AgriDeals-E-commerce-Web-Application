import axios from "axios"

const API_URL = process.env.REACT_APP_BASE_URL + "/api";

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

export const getItem = async (id) => {
    return await axios.get(`${API_URL}/items/${id}`).then((res) => res.data);
}

export const updateItem = async (id, data) => {
    return await axios.put(
        `${API_URL}/items/${id}`,
        data,
        {
            headers: {
                "Content-Type": "application/json",
            },
        }
    );
}
export const deleteItem = async (id) => {
    return await axios.delete(`${API_URL}/items/${id}`);
}

export const search = async (query) => {
    return axios.get(`${API_URL}/items/search/${query}`).then((res) => res.data);
}

export const placeOrder = async (order) => {
    return axios.post(`${API_URL}/orders/`, { ...order }).then((res) => res.data);
}

export const getUserOrders = async (id) => {
    return axios.get(`${API_URL}/orders/user/${id}`).then((res) => res.data);
}