import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { FaBars } from "react-icons/fa";

interface propType {
  setNavOpen: (value: boolean | ((prevVar: boolean) => boolean)) => void;
}
const Navbar = ({ setNavOpen }: propType) => {
  const router = useRouter();
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
        <button className="btn btn-sign" onClick={() => router.push("/login")}>
          Log In
        </button>
        {/* <button className="btn btn-sign">Sign Up</button> */}
      </div>
    </nav>
  );
};

export default Navbar;
