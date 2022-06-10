import "../styles/globals.css";
import { Provider } from "react-redux";
import { store } from "../store/index";
import { RecoilRoot } from "recoil";
import { useEffect } from "react";
import { socket, setSocketRef } from "../config/utils";

// import { configureStore } from "@reduxjs/toolkit";
// import userReducer from "../slices/userReducer";
// const Store = configureStore({
//   reducer: {
//     user: userReducer,
//   },
// });

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <RecoilRoot>
        <Component {...pageProps} />
      </RecoilRoot>
    </Provider>
  );
}

export default MyApp;
