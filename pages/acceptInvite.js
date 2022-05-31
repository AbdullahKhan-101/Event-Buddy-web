import React, { useEffect, useState } from "react";
import AcceptInvite from "../components/AcceptInvite";
import { useRouter } from "next/router";
const AcceptInvitee = () => {
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
  return <div>{loggedIn && <AcceptInvite />}</div>;
};

export default AcceptInvitee;
