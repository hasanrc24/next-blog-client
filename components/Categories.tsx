import Link from "next/link";
import React from "react";
import { Category } from "../types";
import { BiSearch } from "react-icons/bi";
import { useRouter } from "next/router";

interface propsType {
  categories: Category[];
  handleSearch?: (e: any) => void;
}
const Categories = ({ categories, handleSearch }: propsType) => {
  const router = useRouter();

  const isActive = (category: Category) => {
    return category.attributes.slug === router.query.categorySlug;
  };
  return (
    <div className="cat-bar row ">
      <div className="category d-flex align-items-center gap-3 col-md-6">
        <Link
          className={`cat-menu ${router.pathname === "/" && "active"}`}
          href="/"
        >
          Recent
        </Link>
        {categories?.map((curCat) => {
          return (
            <Link
              key={curCat.id}
              className={`cat-menu ${isActive(curCat) && "active"}`}
              href={`/category/${curCat.attributes.slug}`}
            >
              {curCat.attributes.title}
            </Link>
          );
        })}
      </div>
      <div className="col-md-6">
        <div className=" float-md-end">
          <BiSearch />
          <input
            type="text"
            placeholder="Search"
            className="cat-search"
            onChange={handleSearch}
          />
        </div>
      </div>
    </div>
  );
};

export default Categories;
