import axios from "axios";
import { API_URL as PROD_URL } from "@env";
import { StorageAdapter } from "../adapters/storage-adapter";

export const API_URL = PROD_URL;

const fakeStoreApi = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    }
})

//TODO INTERCEPTORS
fakeStoreApi.interceptors.request.use(
    async (config) => {
        const token = await StorageAdapter.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    }
)


export {
    fakeStoreApi,
}

