import { API_URL } from './../config/config';
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

// export const getVerifiedUser = async(jwt:any) => {
//     try {
//         const verUser = await axios.get(`${process.env.API_BASE_URL}/api/users/me`,{
//             headers:{
//                 Authorization: `Bearer ${jwt}`
//             }
//         });
//         return verUser.data;
//     } catch (error) {
//         console.log(error);
//     }
    
// }

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