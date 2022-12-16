import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Article } from "../types";

interface propsType {
  article: Article;
}
const ArticleSpecialCard = ({ article }: propsType) => {
  return (
    <Link href="#" className=" px-3 special-card">
      <div className="col-md-9 let">{article.attributes.title}</div>
      <div className="col-md-3 d-flex justify-content-center">
        <Image src="/gitbook.svg" alt="gitbook" height={70} width={70} />
      </div>
    </Link>
  );
};

export default ArticleSpecialCard;
