import axios from "axios";
import Head from "next/head";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { userInfo } from "../redux/userSlice";
import {
  getTokenFromServerCookie,
  setUserCookie,
  verifyUser,
} from "../config/auth";
import { useRouter } from "next/router";
import Link from "next/link";

const Login = () => {
  const [userData, setUserData] = useState({
    identifier: "",
    password: "",
  });
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();

  const handleChange = (e: any) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e: any) => {
    e.preventDefault();
    const loginInfo = {
      identifier: userData.identifier,
      password: userData.password,
    };
    try {
      const login = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/local`,
        loginInfo
      );
      setUserCookie(login.data);
      (await verifyUser()) &&
        (dispatch(userInfo(login.data)), router.push("/"));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data.error.message);
        setTimeout(() => {
          setError("");
        }, 2000);
      }
    }
  };
  const handleDemoLogin = async () => {
    try {
      const login = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/local`,
        {
          identifier: "hanoda3992@paxven.com",
          password: "hanoda3992@paxven.com",
        }
      );
      setUserCookie(login.data);
      (await verifyUser()) &&
        (dispatch(userInfo(login.data)), router.push("/"));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data.error.message);
        setTimeout(() => {
          setError("");
        }, 2000);
      }
    }
  };

  return (
    <div className="mx-auto login-comp my-5">
      <Head>
        <title>Next Blog | Login</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h4 className="mb-3">Login</h4>
      <form onSubmit={handleLogin}>
        <div className="form-outline mb-4">
          <input
            type="text"
            placeholder="Username or E-mail"
            name="identifier"
            id="form2Example1"
            className="form-control"
            onChange={handleChange}
            value={userData.identifier}
          />
        </div>
        <div className="form-outline mb-4">
          <input
            type="password"
            name="password"
            placeholder="Password"
            id="form2Example2"
            className="form-control"
            onChange={handleChange}
            value={userData.password}
          />
        </div>

        <button type="submit" className="btn btn-paginate mb-4">
          Login
        </button>
        <button
          type="button"
          className="btn mb-4 sub-btn"
          onClick={handleDemoLogin}
        >
          Demo login
        </button>

        <div className="text-center">
          <p>
            Not a member? <Link href="/register">Sign up</Link>
          </p>
        </div>
      </form>
      {error && <p className="text-center">{error}</p>}
    </div>
  );
};

export default Login;

export async function getServerSideProps({ req }: any) {
  const jwt = getTokenFromServerCookie(req);
  if (jwt) {
    return {
      redirect: {
        destination: "/",
      },
    };
  }
  return {
    props: {},
  };
}
