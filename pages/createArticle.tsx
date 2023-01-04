import React, { useState } from "react";
import axios, { AxiosResponse } from "axios";
import dynamic from "next/dynamic";
import MarkdownIt from "markdown-it";
import Head from "next/head";
import { fetchCategories, generateUID } from "../http";
import { Category, CollectionTypes } from "../types";
import { getTokenFromServerCookie } from "../config/auth";
import "react-markdown-editor-lite/lib/index.css";

const MdEditor = dynamic(() => import("react-markdown-editor-lite"), {
  ssr: false,
});
interface propsType {
  categories: Category[];
  user: any;
  jwt: string;
}
const CreateArticle = ({ categories, user, jwt }: propsType) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState({
    title: "",
    category: `${categories[0].id}`,
    body: "",
    slug: "",
  });

  console.log(value);
  const handleChange = (e: any) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const handleImageSelect = (e: any) => {
    setFile(e.target.files[0]);
  };

  const mdParser = new MarkdownIt(/* Markdown-it options */);
  const handleEditorChange = ({ text }: any) => {
    setValue({ ...value, body: text });
  };

  const hanleArticleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    let refId;

    const slug: any = await generateUID(value.title);

    const articleData = {
      data: {
        title: value.title,
        body: value.body,
        category: value.category,
        author: user.id,
        slug: slug,
      },
    };

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/articles`,
        articleData,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      if (res.status === 200) {
        setValue({
          title: "",
          category: `${categories[0].id}`,
          body: "",
          slug: "",
        });
        setLoading(false);
        refId = res.data.data.id;
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }

    if (file !== null) {
      const formData = new FormData();
      formData.append("ref", "api::article.article");
      formData.append("refId", refId);
      formData.append("field", "image");
      formData.append("files", file);
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/upload`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          }
        );
        if (response.status === 200) {
          setFile(null);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="">
      <Head>
        <title>Next Blog | Create</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="row">
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 text-center">
          <h2>Post an Article</h2>
        </div>
      </div>
      <div className="row">
        <div className="col-xs-6 col-sm-8 col-md-6 col-lg-6 col-xs-offset-3 offset-md-3 offset-sm-2">
          <form className="form" onSubmit={hanleArticleSubmit}>
            <div className="form-group my-3">
              <input
                type="text"
                className="form-control"
                name="title"
                placeholder="Title"
                onChange={handleChange}
                value={value.title}
                required
              />
            </div>
            <div className="form-group my-3">
              <select
                className="form-select form-des text-capitalize"
                name="category"
                onChange={handleChange}
                value={value.category}
              >
                {categories?.map((curCat: any) => {
                  const { title } = curCat.attributes;
                  return (
                    <option
                      key={curCat.id}
                      value={curCat.id}
                      className="text-capitalize"
                    >
                      {title}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="form-group my-3 mx-auto">
              <MdEditor
                style={{ height: "300px" }}
                renderHTML={(text) => mdParser.render(text)}
                onChange={handleEditorChange}
                value={value.body}
                placeholder="Write your article here..."
              />
            </div>
            <div className="form-group my-3 w-50 mx-auto">
              <input
                type="file"
                className="form-control"
                onChange={handleImageSelect}
              />
            </div>
            <div className="text-center">
              <button
                type="submit"
                className={`btn res-nav-btn mt-4 ${loading && "disabled"}`}
              >
                Submit
                {loading && (
                  <div
                    className="spinner-border spinner-border-sm ms-2"
                    role="status"
                  ></div>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateArticle;

export const getServerSideProps = async ({ req }: any) => {
  const { data: category }: AxiosResponse<CollectionTypes<Category[]>> =
    await fetchCategories();

  const serverJwt = getTokenFromServerCookie(req);
  if (!serverJwt) {
    return {
      redirect: {
        destination: "/login",
      },
    };
  }
  if (serverJwt) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/me?populate=*`,
      {
        headers: {
          Authorization: `Bearer ${serverJwt}`,
        },
      }
    );
    const verifiedUser = await res.json();
    return {
      props: {
        user: verifiedUser,
        categories: category.data,
        jwt: serverJwt,
      },
    };
  }
  return {
    props: {
      categories: category.data,
    },
  };
};
