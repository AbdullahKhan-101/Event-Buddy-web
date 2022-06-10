import React, { useEffect, useState } from "react";
import Messeges from "../components/Messeges";
import { useRouter } from "next/router";
const Messegess = () => {
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
  return <div>{loggedIn && <Messeges />}</div>;
};

export default Messegess;
