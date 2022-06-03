import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { v4 as uuidv4 } from "uuid";
import SetPassModal from "./Modal/SetPassModal";
import { useDispatch } from "react-redux";
import { HomeActions } from "../store/actions";
import Loader from "./Loader";
import { useRecoilState } from "recoil";
import { loadingState } from "../atoms/modalAtom";
const Login = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hidePassword, setHidePassword] = useState("password");
  const uuid = uuidv4();
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useRecoilState(loadingState);
  useEffect(() => {
    AOS.init();
  }, []);

  const login = async () => {
    setLoading(true);
    if (!email || !password) {
      toast.error("Please Enter Email Or Password");
      setLoading(false);
    } else {
      const payload = {
        Email: email,
        Password: password,
        DeviceUUID: uuid,
        FCMToken: null,
      };
      try {
        let fata = await axios.post(
          "http://54.144.168.52:3000/user/login",
          payload
        );

        if (fata?.data?.Status == 200) {
          localStorage.setItem("JWT", fata?.data?.Data?.Token);

          if (fata?.data?.Data?.User?.Media == null) {
            localStorage.setItem(
              "user",
              JSON.stringify({
                user: fata?.data?.Data?.User,
                token: fata?.data?.Data?.Token,
              })
            );
            localStorage.setItem("JWT", fata?.data?.Data?.Token);
            setLoading(false);
            setEmail("");
            setPassword("");
            router.push("/uploadPicture");
          } else if (fata?.data?.Data?.User?.SelfieMedia == null) {
            localStorage.setItem(
              "user",
              JSON.stringify({
                user: fata?.data?.Data?.User,
                token: fata?.data?.Data?.Token,
              })
            );
            localStorage.setItem("JWT", fata?.data?.Data?.Token);

            setLoading(false);
            setEmail("");
            setPassword("");
            router.push("/selfie");
          } else {
            dispatch(
              HomeActions.userDetails({
                user: fata?.data?.Data?.User,
                token: fata?.data?.Data?.Token,
              })
            );
            localStorage.setItem(
              "user",
              JSON.stringify({
                user: fata?.data?.Data?.User,
                token: fata?.data?.Data?.Token,
              })
            );
            localStorage.setItem("JWT", fata?.data?.Data?.Token);
            router.push("/home");
            setLoading(false);
            setEmail("");
            setPassword("");
          }
        } else {
          toast.error(fata?.data?.Message);
          setLoading(false);

          throw new Error(fata?.data);
        }
      } catch (error) {
        setLoading(false);
        toast.error(error);
      }
    }
  };
  return (
    <div className="bg-white">
      <Head>
        <title>Event Buddy</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/appicon.png" />
      </Head>
      {showModal && (
        <SetPassModal
          closeModal={() => {
            setShowModal(false);
          }}
        />
      )}

      <div
        data-aos="fade-right"
        data-aos-delay="200"
        data-aos-duration="1200"
        className="p-2 mx-auto md:max-w-md mt-28 md:mt-20 max-w-[90%]"
      >
        <h1 className="font-bold font-lgstrong md:font-normall text-[#0E134F] text-[34px] leading-10 md:text-4xl sm:text-center px-2">
          Hey!{" "}
          <span className="block font-extrabold font-lgstrong sm:inline-block ">
            Login Here
          </span>
        </h1>
        <div className="px-2 py-5 my-6 mt-8 space-y-8 bg-gray-0 bg-opacity-40 md:mt-14 rounded-xl">
          <div className="flex items-center pl-2 bg-white rounded-md shadow-[0_4px_40px_-18px_rgba(0,0,0,0.3)]">
            <div className="relative w-[20px] mr-1 h-[18px]  text-[#E9813B] ">
              <Image
                src="/mail.png"
                alt="infoImg"
                layout="fill"
                objectfit="contain"
              />
            </div>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder="Email"
              className="block w-full p-3 border-none rounded-md outline-none font-normall"
            />
          </div>
          <div className="flex items-center pl-2 bg-white rounded-md shadow-[0_4px_45px_-17px_rgba(0,0,0,0.3)]">
            <div className="relative w-[20px] mr-1 h-[18px]  text-[#E9813B] ">
              <Image
                src="/lock.png"
                alt="infoImg"
                layout="fill"
                objectfit="contain"
              />
              <img
                src="/dot.png"
                className="absolute bottom-1 left-2 "
                alt=""
              />
            </div>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type={hidePassword}
              placeholder="Password"
              className="block w-full p-3 border-none rounded-md outline-none font-normall"
            />
            <div className="relative cursor-pointer  w-[16px] mr-4 h-[16px]  text-[#E9813B] ">
              {hidePassword === "text" ? (
                <FontAwesomeIcon
                  icon={faEye}
                  style={{ color: "#ED974B" }}
                  onClick={() => {
                    if (hidePassword === "text") {
                      setHidePassword("password");
                    } else {
                      setHidePassword("text");
                    }
                  }}
                />
              ) : (
                <FontAwesomeIcon
                  icon={faEyeSlash}
                  style={{ color: "grey" }}
                  onClick={() => {
                    if (hidePassword === "text") {
                      setHidePassword("password");
                    } else {
                      setHidePassword("text");
                    }
                  }}
                />
              )}
            </div>
          </div>
        </div>
        <p className="mx-4 mt-3 mb-6 text-sm text-gray-400 sm:text-[16px] sm:text-center md:mt-8 font-normall">
          <span>Forgot Password?</span>
          <button
            onClick={() => setShowModal(true)}
            className="text-[#E9813B] font-normall cursor-pointer"
          >
            {" "}
            Reset Now
          </button>
        </p>
        <button
          className="font-mediumm mx-2 bg-[#ED974B] bg-gradient-to-tr  py-[10px] sm:py-3 px-7 rounded-full text-white from-[#E77334] to-[#ED974B] sm:w-[97%] hover:from-[#ff6715] sm:mt-4"
          onClick={login}
        >
          Login
        </button>
        <p className="mx-4 mt-20 text-sm sm:text-base sm:text-center font-normall ">
          <span className="text-[#42526E] opacity-70">If you are new /</span>
          <span
            onClick={() => router.push("/signup")}
            className="text-[#E9813B]  cursor-pointer font-normall"
          >
            {" "}
            Create New Account
          </span>
        </p>
        <div
          className="mx-4 mt-20 text-sm sm:text-base sm:text-center font-normall "
          style={{
            display: "flex",
            justifyContent: "space-around",
            width: "28vw",
          }}
        >
          <span
            onClick={() => router.push("/termsNConditions")}
            className="text-[#E9813B]  cursor-pointer font-normall"
            style={{ textDecoration: "underline" }}
          >
            {" "}
            Terms & Condition
          </span>
          <span
            onClick={() => router.push("/privacy_policy")}
            className="text-[#E9813B]  cursor-pointer font-normall"
            style={{ textDecoration: "underline" }}
          >
            {" "}
            Privacy Policy
          </span>
        </div>
      </div>
      <ToastContainer />
      <Loader />
    </div>
  );
};

export default Login;
