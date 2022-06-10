import React, { useEffect, useState } from "react";
import Settings from "../components/Settings";
import { useRouter } from "next/router";
const Settingss = () => {
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
  return <div>{loggedIn && <Settings />}</div>;
};

export default Settingss;
