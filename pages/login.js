import React, { useEffect } from "react";
import Login from "../components/Login";
import Image from "next/image";
import { useRouter } from "next/router";
const Signin = () => {
  const router = useRouter();
  useEffect(() => {
    console.log("--->login.js-->useEffect");
    const JWT = localStorage.getItem("JWTEventBuddy");
    if (JWT) {
      router.push("/home");
    }
  }, []);

  console.log("--->login.js");
  return (
    <div
    //  className="bg-[url('/bgdesign1.png')] w-[100%] h-[100%] border"
    >
      {/* <h1>hello</h1> */}
      <Login />
      <div className="absolute bg-[url('/bgdesign1.png')] top-0 md:h-[131px] h-[106px] w-52 md:w-64  bg-no-repeat"></div>
      <div className="absolute bottom-0 right-0 hidden h-[107px] bg-[url('/bgdesign2.png')] -mt-3 w-64  md:block bg-no-repeat"></div>
    </div>
  );
};

export default Signin;
