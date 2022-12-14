import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer>
      <div className=" d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <div>
            <Image src="/logo.png" alt="logo" height={40} width={40} />
            <span className="fw-bold">Next Blog</span>
          </div>
          <span className="mx-2 footer-clr">|</span>
          <div className="footer-clr">
            <span>&copy;</span>
            <span>{new Date().getFullYear()} Next blog</span>
          </div>
        </div>
        <div className="d-flex gap-2">
          <Link href="/">
            <FaFacebookF />
          </Link>
          <Link href="/">
            <FaTwitter />
          </Link>
          <Link href="/">
            <FaInstagram />
          </Link>
          <Link href="/">
            <FaLinkedinIn />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
