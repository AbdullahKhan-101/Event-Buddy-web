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
    <div>
      <Login />
      <div className="absolute top-0 md:h-[131px] h-[106px] w-52 md:w-64 ">
        <Image
          src="/bgdesign1.png"
          alt="infoImg"
          layout="fill"
          objectfit="contain"
        />
      </div>
      <div className="absolute bottom-0 right-0 hidden h-[107px] -mt-3 w-64  md:block ">
        <Image
          src="/bgdesign2.png"
          alt="infoImg"
          layout="fill"
          objectfit="contain"
        />
      </div>
    </div>
  );
};

export default Signin;
