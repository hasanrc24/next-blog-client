import React from "react";
import qs from "qs";
import Router, { useRouter } from "next/router";

interface propsType {
  page: number;
  pageCount: number;
  redictUrl?: string;
}
const Paginate = ({ page, pageCount, redictUrl = "/" }: propsType) => {
  const router = useRouter();
  const prevDisabled = (): boolean => {
    return page <= 1;
  };
  const nextDisabled = (): boolean => {
    return page >= pageCount;
  };

  const handlePaginate = (direction: number) => {
    const queryString = qs.stringify({
      ...router.query,
      page: page + direction,
    });
    router.push(redictUrl + "?" + queryString);
  };
  return (
    <div className="text-center mx-auto">
      <button
        className={`btn btn-paginate ${prevDisabled() && "disabled"}`}
        onClick={() => handlePaginate(-1)}
      >
        Previous
      </button>
      <button
        className={`btn btn-paginate ${nextDisabled() && "disabled"}`}
        onClick={() => handlePaginate(1)}
      >
        Next
      </button>
    </div>
  );
};

export default Paginate;
