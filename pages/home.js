import React, { useEffect, useState } from "react";
import Home from "../components/Home";
import { useRouter } from "next/router";
const Homee = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const JWT = localStorage.getItem("JWT");
    if (!JWT) {
      router.push("/login");
    } else {
      setLoggedIn(true);
    }
  }, []);
  return <div>{loggedIn && <Home />}</div>;
};

export default Homee;
