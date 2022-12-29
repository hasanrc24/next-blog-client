import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { API_URL } from "../config/config";
import { CommentType } from "../types";

interface propsType {
  jwt: string;
  comments: CommentType[];
  articleId: number;
  user: any;
}
const Comment = ({ jwt, comments, articleId, user }: propsType) => {
  // console.log(comments);
  const [commentValue, setCommentValue] = useState("");

  const handleCommentSubmit = async (e: any) => {
    e.preventDefault();

    const commentData = {
      comment: commentValue,
      commenter: `${user.firstName + " " + user.lastName}`,
      avatar: user.avatar,
      article: articleId,
    };
    try {
      await axios.post(`${API_URL}/api/comments`, commentData, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      // await fetch(`${API_URL}/api/comments`, {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //     Authorization: `Bearer ${jwt}`,
      //   },
      //   body: JSON.stringify(commentData),
      // });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section>
      <div className="row pt-4">
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
            <form
              onSubmit={handleCommentSubmit}
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
                    onChange={(e) => setCommentValue(e.target.value)}
                  ></textarea>
                </div>
              </div>
              <div className="float-end mt-2 pt-1">
                <button type="submit" className="btn cmnt-btn px-2 py-1 me-2">
                  Submit
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default Comment;
