import { getUserTokenFromCookie } from './../config/auth';
import axios from "axios";
const api = axios.create({
    baseURL: process.env.API_BASE_URL,
    headers: {
        Authorization: `Bearer ${process.env.API_TOKEN}`
    }
});

export const fetchCategories = async() => {
    return api.get('/api/categories');
}

export const fetchArticles = async(queryString: string) => {
    return api.get(`/api/articles?${queryString}`);
}

// const jwt = getUserTokenFromCookie();
// const userApi = axios.create({
//     baseURL: process.env.API_BASE_URL,
//     headers: {
//         Authorization: `Bearer ${jwt}`
//     }
// });

// export const fetchAuthUser = async() => {
//     return userApi.get('/api/users/me')
// }