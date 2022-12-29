import Link from "next/link";
import React from "react";
import { CommentType } from "../types";

interface propsType {
  jwt: string;
  comments: CommentType[];
}
const Comment = ({ jwt, comments }: propsType) => {
  console.log(comments);
  return (
    <section>
      <div className="pt-4">
        <div className="row">
          <div className="col-md-12 col-lg-10">
            {comments.length !== 0 ? (
              comments?.map((com) => {
                return (
                  <div key={com.id} className="card-body">
                    <div className="d-flex flex-start align-items-center">
                      <img
                        className="rounded-circle shadow-1-strong me-3"
                        src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(19).webp"
                        alt="avatar"
                        width="45"
                        height="45"
                      />
                      <div>
                        <h6 className="fw-bold text-primary mb-1">
                          Lily Coleman
                        </h6>
                        <p className="text-muted small mb-0">
                          Shared publicly - Jan 2020
                        </p>
                      </div>
                    </div>
                    <p className="mt-3 mb-4 pb-2">{com.attributes.comment}</p>
                    {!jwt && (
                      <span>
                        <Link href="/login" className="text-primary">
                          Login
                        </Link>{" "}
                        to post a comment
                      </span>
                    )}
                  </div>
                );
              })
            ) : (
              <div className="">No comments yet.</div>
            )}
            {jwt && (
              <div
                className="card-footer py-3 border-0"
                style={{ backgroundColor: "#f8f9fa" }}
              >
                <div className="d-flex flex-start w-100">
                  <img
                    className="rounded-circle shadow-1-strong me-3"
                    src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(19).webp"
                    alt="avatar"
                    width="40"
                    height="40"
                  />
                  <div className="form-outline w-100">
                    <textarea
                      className="form-control"
                      placeholder="Enter a comment here"
                      rows={4}
                      style={{ background: "#fff" }}
                    ></textarea>
                  </div>
                </div>
                <div className="float-end mt-2 pt-1">
                  <button type="button" className="btn cmnt-btn px-2 py-1 me-2">
                    Submit
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Comment;
