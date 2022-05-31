import React, { useEffect, useState } from "react";
import Chat from "../components/Chat";
import { useRouter } from "next/router";
const Chatt = () => {
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
  return <div className="md:hidden">{loggedIn && <Chat />}</div>;
};

export default Chatt;
