import React, { useEffect, useState } from "react";
import Home from "../components/Home";
import { useRouter } from "next/router";
import io from "socket.io-client";
import { SOCKET_URL } from "../config/utils";
import { setSocketRef } from "../config/utils";
const Homee = () => {
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
      UserDetails()
        .then((res) => {
          // console.log("=======>Render1", res);
          const jwt = localStorage.getItem("JWTEventBuddy");
          socketConnection({ id: res?.user?.Id, token: jwt });
        })
        .catch((e) => {
          // console.log("=======>User Not Login", e);
        });
    }
  };
  const socketConnection = (data) => {
    let socket = io(
      `${SOCKET_URL}?actorId=${data?.id}&authorization=${data?.token}`,
      {
        transports: ["websocket"],
        upgrade: false,
        reconnection: true,
        reconnectionAttempts: Infinity,
        reconnectionDelay: 1000,
        reconnectionDelayMax: 5000,
        pingTimeout: 30000,
      }
    );
    console.log(
      "socket connection made==================================================",
      socket
    );
    setSocketRef(socket);
  };
  const UserDetails = async () => {
    // console.log("=======>ok");
    const User = await localStorage.getItem("user");
    const user = JSON.parse(User);
    // setUser(user);
    return user;
  };
  return <div>{loggedIn && <Home />}</div>;
};

export default Homee;
