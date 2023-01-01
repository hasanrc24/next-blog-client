import axios from "axios";
const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
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
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/content-manager/uid/generate`,
          {
            contentTypeUID: "api::article.article",
            field: "slug",
            data: {
              title: title,
            },
          },
          {
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_UID_TOKEN}`,
            },
          }
        );
        return response.data.data;
      } catch (error) {
        console.log(error);
        return error
      }
}