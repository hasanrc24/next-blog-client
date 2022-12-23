import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { userInfo } from "../redux/userSlice";
import React, { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getUserTokenFromCookie, unsetUserCookie } from "../config/auth";
import { userSubscribe } from "../redux/userSlice";

interface propType {
  setNavOpen: (value: boolean | ((prevVar: boolean) => boolean)) => void;
}
const Navbar = ({ setNavOpen }: propType) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const jwt = getUserTokenFromCookie();
  const [hydrated, setHydrated] = useState(false);

  const userDataRedux = useSelector(userSubscribe);

  const handleLogout = () => {
    unsetUserCookie();
    dispatch(userInfo({}));
  };

  useEffect(() => {
    setHydrated(true);
  }, []);
  return (
    <nav>
      <Link href="/" className="d-flex align-items-center">
        <Image src="/logo.png" alt="logo" height={40} width={40} />
        <span className="logo-txt fw-bold">Next Blog</span>
      </Link>
      <FaBars
        className="bars"
        onClick={() => {
          setNavOpen(true);
        }}
      />
      <ul className="nav-list">
        <li className="links">
          <Link href="/products">Products</Link>
        </li>
        <li className="links">
          <Link href="/pricing">Pricing</Link>
        </li>
        <li className="links">
          <Link href="/docs">Docs</Link>
        </li>
        <li className="links">
          <Link href="/company">Company</Link>
        </li>
      </ul>
      <div className="nav-btn">
        {hydrated &&
          (jwt ? (
            <div>
              <Link href="/profile" className="profile-btn">
                Profile
              </Link>
              <button className="btn btn-sign" onClick={handleLogout}>
                Log out
              </button>
            </div>
          ) : (
            <Link href="/login" className="btn btn-sign">
              Log in
            </Link>
          ))}
      </div>
    </nav>
  );
};

export default Navbar;
