import axios from "axios";
import { useRouter } from "next/router";
import React from "react";
import { useSelector } from "react-redux";
import {
  getTokenFromServerCookie,
  getUserTokenFromCookie,
} from "../config/auth";
import { API_URL } from "../config/config";
// import { getVerifiedUser } from "../http";
import { userSubscribe } from "../redux/userSlice";

const Profile = ({ data }: any) => {
  // const user = useSelector(userSubscribe);
  const router = useRouter();

  console.log(data);
  // console.log(Object.keys(user.user).length);
  // if (Object.keys(user.user).length === 0) {
  //   return;
  // } else if (Object.keys(user.user).length !== 0) {
  //   const { username } = user.user.user;
  //   return (
  //     <div>
  //       Username: <span className="fw-bold">{username}</span>
  //     </div>
  //   );
  // }

  return <div className="">{data.username}</div>;
};

export default Profile;

export const getServerSideProps = async ({ req }: any) => {
  const jwt = getUserTokenFromCookie();
  const serverJwt = getTokenFromServerCookie(req);
  console.log(serverJwt);
  if (!serverJwt) {
    return {
      redirect: {
        destination: "/login",
      },
    };
  }
  if (serverJwt) {
    // try {
    const res = await fetch(`${API_URL}/api/users/me`, {
      headers: {
        Authorization: `Bearer ${serverJwt}`,
      },
    });
    const verifiedUser = await res.json();
    return {
      props: {
        data: verifiedUser,
      },
    };
    // } catch (error) {
    //   console.log(error);
    // }
  } else {
    return {
      props: { data: "error" },
    };
  }
  // return {
  //   props: {
  //     data: verifiedUser
  //   },
  // };
};
