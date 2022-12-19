import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Article } from "../types";
import { formatDate } from "../utils";

interface propsType {
  article: Article;
}
const ArticleCard = ({ article }: propsType) => {
  const { title, body } = article.attributes;
  return (
    <div>
      <h4>
        <Link href={`/article/${article.attributes.slug}`}>{title}</Link>
      </h4>
      <div className="my-3">
        <Image
          src={`http://localhost:1337${article.attributes.author.data.attributes.avatar.data.attributes.formats.thumbnail.url}`}
          alt="avatar"
          height={30}
          width={30}
          className="rounded"
        />
        <span className="mx-2 article-author">
          {article.attributes.author.data.attributes.firstName +
            " " +
            article.attributes.author.data.attributes.lastName}
        </span>
        <span className="article-author article-created">
          {formatDate(article.attributes.createdAt)}
        </span>
      </div>
      <p>{body.slice(0, 200)}...</p>
    </div>
  );
};

export default ArticleCard;
