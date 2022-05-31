import React, { useEffect, useState } from "react";
import Person from "../components/Person";
import { useRouter } from "next/router";
const Personn = () => {
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
  return <div>{loggedIn && <Person />}</div>;
};

export default Personn;
