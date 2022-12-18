import { useRouter } from "next/router";
import React from "react";
import { Article } from "../types";
import ArticleCard from "./ArticleCard";
import ArticleSpecialCard from "./ArticleSpecialCard";

interface propsType {
  articles: Article[];
}
const Articles = ({ articles }: propsType) => {
  const router = useRouter();
  return (
    <div className="row">
      {articles.length === 0 ? (
        <div className="text-center fw-bolder py-5">No article found</div>
      ) : (
        articles?.map((curCat, idx) => {
          return (
            <div key={curCat.id} className="col-md-6 my-4 ">
              {router.pathname === "/" ? (
                idx === 1 ? (
                  <ArticleSpecialCard article={curCat} />
                ) : (
                  <ArticleCard article={curCat} />
                )
              ) : (
                <ArticleCard article={curCat} />
              )}
            </div>
          );
        })
      )}
    </div>
  );
};

export default Articles;
