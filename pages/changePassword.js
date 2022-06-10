import React, { useEffect, useState } from "react";
import ChangePassword from "../components/ChangePassword";
import { useRouter } from "next/router";
const ChangePasswordd = () => {
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
  return <div>{loggedIn && <ChangePassword />}</div>;
};

export default ChangePasswordd;
