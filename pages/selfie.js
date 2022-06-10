import React, { useEffect, useState } from "react";
import Selfie from "../components/Selfie";
import { useRouter } from "next/router";
const Picture = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const JWT = localStorage.getItem("JWTEventBuddy");
    if (!JWT) {
      router.push("/login");
    } else {
      setLoggedIn(true);
    }
  }, []);
  return <div>{loggedIn && <Selfie />}</div>;
};

export default Picture;
