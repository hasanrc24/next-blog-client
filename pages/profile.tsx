import React from "react";
import { getTokenFromServerCookie } from "../config/auth";
import { API_URL } from "../config/config";

const Profile = ({ data }: any) => {
  console.log(data);
  return <div className="">{data.username}</div>;
};

export default Profile;

export const getServerSideProps = async ({ req }: any) => {
  const serverJwt = getTokenFromServerCookie(req);
  if (!serverJwt) {
    return {
      redirect: {
        destination: "/login",
      },
    };
  }
  if (serverJwt) {
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
  } else {
    return {
      props: { data: "error" },
    };
  }
};
