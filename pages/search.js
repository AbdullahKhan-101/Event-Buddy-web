import React, { useEffect, useState } from "react";
import Search from "../components/Search";
import { useRouter } from "next/router";
const Searchh = () => {
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
  return <div>{loggedIn && <Search />}</div>;
};

export default Searchh;
