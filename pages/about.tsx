import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const About = () => {
  return (
    <div className="">
      <Head>
        <title>Next Blog | About us</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="row my-4 py-4">
        <div className="col-md-6">
          <h3>About us</h3>
          <p className="my-4">
            Welcome to &quot;Next Blog&quot;! We are a team of passionate
            individuals who are dedicated to creating high-quality content for
            our readers. <br /> Our blog covers a wide range of topics,
            including but not limited to lifestyle, travel, fashion, and
            personal development. Our goal is to provide our readers with
            valuable information and inspiration to help them live their best
            lives. <br /> <br /> We believe in the power of storytelling and
            strive to share authentic and relatable experiences through our
            writing. Our team is made up of talented writers from diverse
            backgrounds, each bringing their own unique perspective and voice to
            the table. <br /> We are constantly learning and growing, and we
            hope to use our platform to not only entertain and inform, but also
            to make a positive impact in the world. <br /> <br /> Thank you for
            stopping by and taking the time to learn more about us. We hope you
            enjoy our content and come back to visit us again soon.
          </p>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://www.google.com/search?q=next+blog&sxsrf=ALiCzsZxp-TY0tQj_PRAAP04vwMIhaM0mw%3A1672811780000&source=hp&ei=AxW1Y4fMOcSV-AaAwZKYDQ&iflsig=AJiK0e8AAAAAY7UjFGjha4_jTBB6fKOrXW3Dr7YWOgTB&ved=0ahUKEwjH2a2_na38AhXECt4KHYCgBNMQ4dUDCAg&uact=5&oq=next+blog&gs_lcp=Cgdnd3Mtd2l6EAMyBQgAEIAEMgUIABCABDIFCAAQgAQyBQgAEIAEMgYIABAWEB4yBggAEBYQHjIICAAQFhAeEA8yCQgAEBYQHhDxBDIGCAAQFhAeMggIABAWEB4QDzoHCCMQ6gIQJzoECCMQJzoFCAAQkQI6CwgAEIAEELEDEIMBOggIABCABBCxAzoLCC4QgwEQsQMQgAQ6CAguELEDEIAEOhEILhCABBCxAxCDARDHARDRAzoECAAQQzoQCC4QsQMQgwEQxwEQ0QMQQzoECC4QQzoHCAAQsQMQQzoNCC4QsQMQxwEQ0QMQQzoKCAAQsQMQgwEQQzoGCAAQChBDOgUILhCABDoHCC4QgAQQEzoKCAAQgAQQsQMQEzoHCAAQgAQQEzoHCC4QgAQQCjoKCAAQgAQQsQMQCjoHCAAQgAQQCjoTCC4QgAQQsQMQgwEQxwEQrwEQClCDCFiXFWCpH2gBcAB4AIABtgGIAfQJkgEDMC45mAEAoAEBsAEK&sclient=gws-wiz"
            className="btn res-nav-btn"
          >
            Learn more
          </a>
        </div>
        <div className="col-md-6">
          <img src="/about.png" alt="blogging" />
        </div>
      </div>
    </div>
  );
};

export default About;
