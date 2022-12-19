import { AxiosResponse } from "axios";
import { GetServerSideProps } from "next";
import qs from "qs";
import React from "react";
import { fetchArticles } from "../../http";
import { CollectionTypes, Article } from "../../types";

interface propsType {
  singleArticle: Article;
}
const articleSlug = ({ singleArticle }: propsType) => {
  const { title } = singleArticle.attributes;
  console.log(singleArticle.attributes);
  return (
    <div className="row">
      <div className="col-md-8">
        <h4>{title}</h4>
      </div>
      <div className="col-md-4">hello</div>
    </div>
  );
};

export default articleSlug;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const options = {
    populate: ["image", "author.avatar"],
    filters: {
      slug: {
        $eq: query.articleSlug,
      },
    },
  };
  const queryString = qs.stringify(options);

  const { data: article }: AxiosResponse<CollectionTypes<Article[]>> =
    await fetchArticles(queryString);
  return {
    props: {
      singleArticle: article.data[0],
    },
  };
};
