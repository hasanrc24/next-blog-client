import axios, { Axios, AxiosResponse } from "axios";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import qs from "qs";
import React from "react";
import { fetchArticles, fetchComments } from "../../http";
import { CollectionTypes, Article, CommentType } from "../../types";
import { formatDate } from "../../utils/index";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";
import { API_URL, CLOUDINARY_URL } from "../../config/config";
import Comment from "../../components/Comment";
import { getTokenFromServerCookie } from "../../config/auth";

interface propsType {
  singleArticle: Article;
  jwt: string;
  comments: CommentType[];
  user: any;
}
const articleSlug = ({ singleArticle, jwt, comments, user }: propsType) => {
  const { title, body } = singleArticle.attributes;
  const avatar = singleArticle.attributes.author.data.attributes.avatar;
  // console.log(singleArticle.attributes.comments.data);
  return (
    <>
      <Head>
        <title>Next Blog | Article</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="row mt-5">
        <div className="col-md-8">
          <h4>{title}</h4>
          <div className="py-2">
            {avatar === null || avatar === "default" ? (
              <Image
                src="/R.png"
                alt="avatar"
                height={30}
                width={30}
                className="rounded"
              />
            ) : (
              <img
                src={`${CLOUDINARY_URL}${avatar}`}
                alt={singleArticle.attributes.author.data.attributes.username}
                height={30}
                width={30}
                className="rounded"
              />
            )}
            <span className="mx-2 fw-bold">
              {singleArticle.attributes.author.data.attributes.firstName}{" "}
              {singleArticle.attributes.author.data.attributes.lastName}
            </span>
            <span className="article-created">
              {formatDate(singleArticle.attributes.createdAt)}
            </span>
          </div>
          <div className="mt-4">
            {singleArticle.attributes.image?.data && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={`${API_URL}${singleArticle.attributes.image?.data?.attributes?.url}`}
                alt="body image"
                className="img-fluid"
                style={{ width: "100%" }}
              />
            )}
            <p className="pt-3">{body}</p>
          </div>
          <Comment
            jwt={jwt}
            comments={comments}
            articleId={singleArticle.id}
            user={user}
            // commenter={singleArticle.attributes.comments.data}
          />
        </div>
        <div className="col-md-4">
          <h5>Signup to our newsletter</h5>
          <p className="py-3">
            Get the latest on all things data delivered straight to your inbox
          </p>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Your work email"
            className="form-control"
          />
          <button className="btn sub-btn mt-3 px-4">Subscribe</button>

          <div className="d-flex gap-2 share mt-4">
            <span className="fw-bold">Share</span>
            <Link className="share" href="/">
              <FaFacebookF />
            </Link>
            <Link className="share" href="/">
              <FaTwitter />
            </Link>
            <Link className="share" href="/">
              <FaInstagram />
            </Link>
            <Link className="share" href="/">
              <FaLinkedinIn />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default articleSlug;

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
}) => {
  const options = {
    populate: ["image", "author.avatar", "comments"],
    filters: {
      slug: {
        $eq: query.articleSlug,
      },
    },
  };
  const queryString = qs.stringify(options);

  const { data: article }: AxiosResponse<CollectionTypes<Article[]>> =
    await fetchArticles(queryString);

  const jwt = getTokenFromServerCookie(req);

  const { data: comments }: AxiosResponse<CollectionTypes<CommentType[]>> =
    await fetchComments();

  const res = await fetch(`${API_URL}/api/users/me`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  const verifiedUser = await res.json();
  return {
    props: {
      singleArticle: article.data[0],
      jwt: jwt,
      comments: article.data[0].attributes.comments.data,
      user: verifiedUser,
    },
  };
};
