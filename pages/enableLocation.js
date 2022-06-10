import React, { useEffect, useState } from "react";
import EnableLocation from "../components/EnableLocation";
import { useRouter } from "next/router";
const EnableLocationn = () => {
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
  return <div>{loggedIn && <EnableLocation />}</div>;
};

export default EnableLocationn;
