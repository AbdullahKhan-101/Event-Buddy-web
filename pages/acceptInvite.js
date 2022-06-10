import React, { useEffect, useState } from "react";
import AcceptInvite from "../components/AcceptInvite";
import { useRouter } from "next/router";
const AcceptInvitee = () => {
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
  return <div>{loggedIn && <AcceptInvite />}</div>;
};

export default AcceptInvitee;
