import React, { useEffect, useState } from "react";
import EnableLocation from "../components/EnableLocation";
import { useRouter } from "next/router";
const EnableLocationn = () => {
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
  return <div>{loggedIn && <EnableLocation />}</div>;
};

export default EnableLocationn;
