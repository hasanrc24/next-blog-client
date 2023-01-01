import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { CommentType } from "../types";
import { formatCommentDate } from "../utils";

interface propsType {
  jwt: string;
  comments: CommentType[];
  articleId: number;
  user: any;
}
const Comment = ({ jwt, comments, articleId, user }: propsType) => {
  // console.log(comments);
  const [commentValue, setCommentValue] = useState("");
  const router = useRouter();

  const handleCommentSubmit = async (e: any) => {
    e.preventDefault();

    const commentData = {
      data: {
        comment: commentValue,
        commenter: `${user.firstName + " " + user.lastName}`,
        avatar: user.avatar,
        article: articleId,
      },
    };
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/comments`,
        commentData,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      if (response.status === 200) {
        setCommentValue("");
        router.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section>
      <div className="row pt-4">
        <div className="col-md-12 col-lg-10">
          <p className="pb-1" style={{ fontWeight: "500" }}>
            Comments:{" "}
          </p>
          {comments.length !== 0 ? (
            comments?.map((com) => {
              const { avatar, comment, commenter, createdAt } = com.attributes;
              return (
                <div key={com.id}>
                  <div className="d-flex flex-start align-items-center">
                    {avatar === null || avatar === "default" ? (
                      <Image
                        src="/R.png"
                        alt="avatar"
                        className="rounded-circle"
                        height={45}
                        width={45}
                      />
                    ) : (
                      <img
                        src={`${process.env.NEXT_PUBLIC_CLOUDINARY_IMG}${com.attributes.avatar}`}
                        alt={user.username}
                        height={45}
                        width={45}
                        className="rounded-circle"
                      />
                    )}
                    <div className="ms-2">
                      <h6 className="fw-bold mb-1">{commenter}</h6>
                      <p className="text-muted small mb-0">
                        {formatCommentDate(createdAt)}
                      </p>
                    </div>
                  </div>
                  <p className="mt-3 ps-2">{comment}</p>
                </div>
              );
            })
          ) : (
            <>
              <div className="mb-4">No comments yet.</div>
            </>
          )}
          {jwt ? (
            <form
              onSubmit={handleCommentSubmit}
              className="card-footer py-3 border-0"
              style={{ backgroundColor: "#f8f9fa" }}
            >
              <div className="d-flex flex-start w-100">
                {user.avatar === null || user.avatar === "default" ? (
                  <Image
                    src="/R.png"
                    alt="avatar"
                    className="rounded-circle"
                    height={45}
                    width={45}
                  />
                ) : (
                  <img
                    src={`${process.env.NEXT_PUBLIC_CLOUDINARY_IMG}${user.avatar}`}
                    alt={user.username}
                    height={45}
                    width={45}
                    className="rounded-circle"
                  />
                )}
                <div className="form-outline w-100 ms-2">
                  <textarea
                    className="form-control"
                    placeholder="Enter a comment here"
                    rows={3}
                    required
                    style={{ background: "#fff" }}
                    onChange={(e) => setCommentValue(e.target.value)}
                    value={commentValue}
                  ></textarea>
                </div>
              </div>
              <div className="float-end mt-2 pt-1">
                <button type="submit" className="btn res-nav-btn">
                  Submit
                </button>
              </div>
            </form>
          ) : (
            <span>
              <Link href="/login" className="text-primary">
                Login
              </Link>{" "}
              to post a comment
            </span>
          )}
        </div>
      </div>
    </section>
  );
};

export default Comment;
