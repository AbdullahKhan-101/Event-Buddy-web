import "../styles/globals.css";
import { Provider } from "react-redux";
import { store } from "../store/index";
import { RecoilRoot } from "recoil";
import { useEffect } from "react";
import { socket, setSocketRef } from "../config/utils";
import io from "socket.io-client";
import { SOCKET_URL } from "../config/utils";
// import { configureStore } from "@reduxjs/toolkit";
// import userReducer from "../slices/userReducer";
// const Store = configureStore({
//   reducer: {
//     user: userReducer,
//   },
// });

function MyApp({ Component, pageProps }) {
  // console.log("=======>Render");
  useEffect(() => {
    UserDetails()
      .then((res) => {
        // console.log("=======>Render1");
        socketConnection({ id: res?.user?.Id, token: res?.token });
      })
      .catch((e) => {
        // console.log("=======>User Not Login", e);
      });
  }, []);
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
  return (
    <Provider store={store}>
      <RecoilRoot>
        <Component {...pageProps} />
      </RecoilRoot>
    </Provider>
  );
}

export default MyApp;
