import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Article } from "../types";

interface propsType {
  articles: Article[];
}
const Articles = ({ articles }: propsType) => {
  // console.log(articles);
  return (
    <div className="row">
      {articles?.map((curArt) => {
        const { title, body } = curArt.attributes;
        return (
          <div key={curArt.id} className="col-md-6 my-4">
            <h4>
              <Link href="#">{title}</Link>
            </h4>
            <div>
              <Image
                src={`${process.env.API_BASE_URL}${curArt.attributes.author.data.attributes.avatar.data.attributes.formats.thumbnail.url}`}
                alt="avatar"
                height={30}
                width={30}
              />
            </div>
            <p>{body.slice(0, 200)}...</p>
          </div>
        );
      })}
    </div>
  );
};

export default Articles;
