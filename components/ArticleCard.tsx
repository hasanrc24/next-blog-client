import Image from "next/image";
import Link from "next/link";
import React from "react";
import { API_URL } from "../config/config";
import { Article } from "../types";
import { formatDate } from "../utils";

interface propsType {
  article: Article;
}
const ArticleCard = ({ article }: propsType) => {
  const { title, body } = article.attributes;
  console.log(article);
  return (
    <div>
      <h4>
        <Link href={`/article/${article.attributes.slug}`}>{title}</Link>
      </h4>
      <div className="my-3">
        {article.attributes.author.data.attributes.avatar2 === null ? (
          <Image
            src="/r.png"
            alt="avatar"
            className="rounded"
            height={30}
            width={30}
          />
        ) : (
          <Image
            src={`https://res.cloudinary.com/dnqvwwxzv/image/upload/${article.attributes.author.data.attributes.avatar2}`}
            alt="avatar"
            height={30}
            width={30}
            className="rounded"
          />
        )}
        <span className="mx-2 fw-bold">
          {article.attributes.author.data.attributes.firstName +
            " " +
            article.attributes.author.data.attributes.lastName}
        </span>
        <span className="article-created">
          {formatDate(article.attributes.createdAt)}
        </span>
      </div>
      <p>{body.slice(0, 200)}...</p>
    </div>
  );
};

export default ArticleCard;
