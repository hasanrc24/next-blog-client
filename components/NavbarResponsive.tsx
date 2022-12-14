import Link from "next/link";
import React from "react";
import { GrFormClose } from "react-icons/gr";
import { FaBars } from "react-icons/fa";
import Image from "next/image";

interface propType {
  navOpen: Boolean;
  setNavOpen: (value: boolean | ((prevVar: boolean) => boolean)) => void;
}
const NavbarResponsive = ({ navOpen, setNavOpen }: propType) => {
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
            <span className="logo-txt">Next Blog</span>
          </Link>
        </li>
        <li>
          <Link href="/products" onClick={() => setNavOpen(false)}>
            Products
          </Link>
        </li>
        <li>
          <Link href="/pricing" onClick={() => setNavOpen(false)}>
            Pricing
          </Link>
        </li>
        <li>
          <Link href="/docs" onClick={() => setNavOpen(false)}>
            Docs
          </Link>
        </li>
        <li>
          <Link href="/company" onClick={() => setNavOpen(false)}>
            Company
          </Link>
        </li>
        <li>
          <button className="btn res-nav-btn" onClick={() => setNavOpen(false)}>
            Log In
          </button>
        </li>
        <li>
          <button className="btn res-nav-btn" onClick={() => setNavOpen(false)}>
            Sign Up
          </button>
        </li>
      </ul>
    </div>
  );
};

export default NavbarResponsive;
