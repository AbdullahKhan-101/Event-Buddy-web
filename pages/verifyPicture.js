import React, { useEffect, useState } from "react";
import VerifyPicture from "../components/VerifyPicture";
import { useRouter } from "next/router";
const verifyPic = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const router = useRouter();
  useEffect(() => {
    loged();
  }, []);
  const loged = () => {
    const JWT = localStorage.getItem("JWTEventBuddy");
    if (!JWT) {
      router.push("/login");
    } else {
      setLoggedIn(true);
    }
  };
  return <div>{loggedIn && <VerifyPicture />}</div>;
};

export default verifyPic;
