import Image from "next/image";
import React from "react";
import { Article } from "../types";
import ArticleCard from "./ArticleCard";
import ArticleSpecialCard from "./ArticleSpecialCard";

interface propsType {
  articles: Article[];
}
const Articles = ({ articles }: propsType) => {
  return (
    <div className="row">
      {articles?.map((curCat, idx) => {
        return (
          <div key={curCat.id} className="col-md-6 my-4 ">
            {idx === 1 ? (
              <ArticleSpecialCard key={curCat.id} article={curCat} />
            ) : (
              <ArticleCard key={curCat.id} article={curCat} />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Articles;
