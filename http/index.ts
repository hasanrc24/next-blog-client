import axios from "axios";
import { API_URL } from "../config/config";
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

export const fetchComments = async() =>{
    return api.get('/api/comments')
}

export const generateUID = async(title: string) => {
    try {
        const response = await axios.post(
          `${API_URL}/content-manager/uid/generate`,
          {
            contentTypeUID: "api::article.article",
            field: "slug",
            data: {
              title: title,
            },
          },
          {
            headers: {
              Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjcyNTEyMjM3LCJleHAiOjE2NzUxMDQyMzd9.dQ_dJhNGrTxrQyf5db0zNqMwmAFCmV3hpNhSbVWO1PM`,
            },
          }
        );
        console.log(response);
        return response.data
      } catch (error) {
        console.log(error);
        return error
      }
}