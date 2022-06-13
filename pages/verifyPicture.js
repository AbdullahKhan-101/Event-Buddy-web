import React, { useEffect, useState } from "react";
import VerifyPicture from "../components/VerifyPicture";
import { useRouter } from "next/router";
const VerifyPic = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const router = useRouter();

  const loged = () => {
    const JWT = localStorage.getItem("JWTEventBuddy");
    if (!JWT) {
      router.push("/login");
    } else {
      setLoggedIn(true);
    }
  };
  useEffect(() => {
    loged();
  }, []);
  return <div>{loggedIn && <VerifyPicture />}</div>;
};

export default VerifyPic;
