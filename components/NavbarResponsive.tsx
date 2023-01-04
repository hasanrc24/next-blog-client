import Link from "next/link";
import React, { useEffect, useState } from "react";
import { GrFormClose } from "react-icons/gr";
import Image from "next/image";
import { getUserNameFromCookie, unsetUserCookie } from "../config/auth";
import { useDispatch, useSelector } from "react-redux";
import { userInfo, userSubscribe } from "../redux/userSlice";

interface propType {
  navOpen: Boolean;
  setNavOpen: (value: boolean | ((prevVar: boolean) => boolean)) => void;
}
const NavbarResponsive = ({ navOpen, setNavOpen }: propType) => {
  const [hydrate, setHydrate] = useState(false);
  const user = getUserNameFromCookie();
  const dispatch = useDispatch();
  // const authenticatedUser = useSelector(userSubscribe);
  // const user = authenticatedUser?.user?.user?.username;

  useEffect(() => {
    setHydrate(true);
  }, []);
  const handleLogout = () => {
    unsetUserCookie();
    dispatch(userInfo({}));
    setNavOpen(false);
  };

  return (
    <div className={`${navOpen ? "res-nav res-nav-open" : "res-nav"}`}>
      <GrFormClose
        className="close-nav"
        onClick={() => {
          setNavOpen(false);
        }}
      />
      <ul className="res-nav-ul">
        <li>
          <Link href="/" onClick={() => setNavOpen(false)}>
            <Image src="/logo.png" alt="logo" height={40} width={40} />
            {/* <span className="logo-txt">Next Blog</span> */}
          </Link>
        </li>
        <li>
          <Link href="/about" onClick={() => setNavOpen(false)}>
            About
          </Link>
        </li>
        <li>
          <Link href="/contact" onClick={() => setNavOpen(false)}>
            Contact
          </Link>
        </li>
        {hydrate &&
          (user ? (
            <li>
              <Link
                href="/profile"
                className="text-center d-block mb-3 res-nav-profile"
                onClick={() => setNavOpen(false)}
              >
                Profile
              </Link>
              <button className="btn res-nav-btn" onClick={handleLogout}>
                Log out
              </button>
            </li>
          ) : (
            <li className="d-flex flex-column justify-align-center">
              <Link
                href="/login"
                className="btn res-nav-btn"
                onClick={() => setNavOpen(false)}
              >
                Log in
              </Link>
              <Link href="/register" className="btn sub-btn mt-2">
                Sign up
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default NavbarResponsive;
