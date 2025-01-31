import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { LockClosedIcon, MailIcon, UserIcon } from "@heroicons/react/outline";
import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { HomeActions } from "../store/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Head from "next/head";
import Loader from "./Loader";
import { baseUrl } from "../config/utils";
const SignUp = () => {
  const dispatch = useDispatch();

  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const SignupResponse = useSelector((state) => state?.Home?.OnSignup);
  const [signupSuccess, setSignupSuccess] = useState([]);
  const [hidePassword, setHidePassword] = useState("password");
  const [hideConfirmPassword, setHideConfirmPassword] = useState("password");
  useEffect(() => {
    AOS.init();
  }, []);

  const signup = async () => {
    if (!name || !email || !password || !confirmPassword) {
      toast.error("Please enter complete details");
    } else if (password != confirmPassword) {
      toast.error("Passwords Not Matched");
    } else {
      const payload = {
        Email: email,
        Password: password,
        FullName: name,
        UserName: name,
      };
      try {
        let fata = await axios.post(`${baseUrl}user/signup`, payload);
        // console.log(fata, "api payload");
        if (fata?.data?.Status == 200) {
          toast.success("Signup Successful");
          setName("");
          setEmail("");
          setPassword("");
          setConfirmPassword("");
          router.push("/login");
        } else {
          // toast.error(fata?.data?.Message);
          // console.log(fata, "api payload");
          toast.error(fata?.data?.Message);
          throw new Error(fata?.data);
        }
      } catch (error) {
        toast.error(error);
        // console.log(error, "api payload");
      }

      // console.log(fata?.data?.Status, "api payload");
      // setName("");
      // setEmail("");
      // setPassword("");
      // setConfirmPassword("");
      // await test(payload);
      // router.push("/login");
    }
  };

  const userProfile = useSelector((state) => state?.Home?.UserProfile);

  // const test = async (payload) => {
  //   console.log("user Profile ", userProfile);
  //   let fata = await axios.post(
  //     "http://54.144.168.52:3000/user/signup",
  //     payload
  //   );
  //   console.log(fata, "fata");
  // };

  useEffect(() => {
    loadingTrue();
  }, []);
  const loadingTrue = () => {
    setSignupSuccess(SignupResponse);
    dispatch(HomeActions.UserProfile());
  };
  return (
    <div className="bg-white">
      <Head>
        <title>Event Buddy</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/appicon.png" />
      </Head>
      <div
        data-aos="fade-right"
        data-aos-delay="300"
        data-aos-duration="1200"
        className="p-2 mx-auto md:max-w-md sm:mt-6 max-w-[90%] "
      >
        <h1 className="font-bold font-lgstrong md:font-normall text-[#0E134F] text-[34px] leading-10 md:text-4xl sm:text-center px-2 md:my-12 my-28">
          Welcome!{" "}
          <span className="block font-extrabold font-lgstrong sm:inline-block ">
            Signup Now
          </span>
        </h1>
        {/* input here */}
        <div className="px-2 py-5 mb-2 -mt-20 space-y-8 md:mt-6 md:mb-6 bg-gray-0 bg-opacity-40 rounded-xl">
          <div className="flex items-center pl-2 bg-white rounded-md shadow-[0_4px_40px_-18px_rgba(0,0,0,0.3)]">
            <div className="relative w-[10px] mr-[8px] ml-1 h-[10px] mb-2  text-[#E9813B] ">
              <Image
                src="/userhead.png"
                alt="infoImg"
                layout="fill"
                objectfit="contain"
              />
              <div className="relative w-[15px] mr-[1px] h-[8px] -ml-[2px] mt-[12px] text-[#E9813B] ">
                <Image
                  src="/userbody.png"
                  alt="infoImg"
                  layout="fill"
                  objectfit="contain"
                />
              </div>
            </div>
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              value={name}
              className="block w-full p-3 border-none rounded-md outline-none font-normall"
            />
          </div>
          <div className="flex items-center pl-2 bg-white rounded-md shadow-[0_4px_60px_-18px_rgba(0,0,0,0.3)]">
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
              placeholder="Email"
              value={email}
              className="block w-full p-3 border-none outline-none rsounded-md font-normall"
            />
          </div>
          <div className="flex items-center pl-2 bg-white rounded-md shadow-[0_4px_60px_-18px_rgba(0,0,0,0.3)]">
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
              type={hidePassword}
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              placeholder="Password"
              className="block w-full p-3 border-none outline-none rsounded-md font-normall"
            />
            <div className="relative cursor-pointer  w-[16px] mr-4 h-[16px]  text-[#E9813B] ">
              {/* <Image
                src="/passwordhide.png"
                alt="infoImg"
                layout="fill"
                objectfit="contain"
                onClick={() => {
                  if (hidePassword === "text") {
                    setHidePassword("password");
                  } else {
                    setHidePassword("text");
                  }
                }}
              /> */}
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
          <div className="flex items-center pl-2 bg-white rounded-md shadow-[0px_4px_60px_-18px_rgba(0,0,0,0.3)] ">
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
              type={hideConfirmPassword}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-type password"
              className="block w-full p-3 border-none outline-none rsounded-md font-normall "
            />
            <div className="relative cursor-pointer  w-[16px] mr-4 h-[16px]  text-[#E9813B] ">
              {/* <Image
                src="/passwordhide.png"
                alt="infoImg"
                layout="fill"
                objectfit="contain"
                onClick={() => {
                  if (hideConfirmPassword === "text") {
                    setHideConfirmPassword("password");
                  } else {
                    setHideConfirmPassword("text");
                  }
                }}
              /> */}
              {hideConfirmPassword === "text" ? (
                <FontAwesomeIcon
                  icon={faEye}
                  style={{ color: "#ED974B" }}
                  onClick={() => {
                    if (hideConfirmPassword === "text") {
                      setHideConfirmPassword("password");
                    } else {
                      setHideConfirmPassword("text");
                    }
                  }}
                />
              ) : (
                <FontAwesomeIcon
                  icon={faEyeSlash}
                  style={{ color: "grey" }}
                  onClick={() => {
                    if (hideConfirmPassword === "text") {
                      setHideConfirmPassword("password");
                    } else {
                      setHideConfirmPassword("text");
                    }
                  }}
                />
              )}
            </div>
          </div>
        </div>
        <button
          onClick={signup}
          // onClick={test}
          className="font-mediumm mt-2 mx-2 bg-[#ED974B] bg-gradient-to-tr  py-[10px] sm:py-3 px-7 rounded-full text-white from-[#E77334] to-[#ED974B] sm:w-[97%] hover:from-[#ff6715] sm:mt-4"
        >
          Signup
        </button>
        <p className="mx-4 mb-3 text-sm mt-7 sm:text-base sm:text-center xl:mt-14 md:mt-11 font-normall">
          <span className="text-[#42526E] opacity-70">
            If already have account /
          </span>
          <span
            onClick={() => router.push("/login")}
            className="text-[#E9813B] font-semibold cursor-pointer opacity-100"
          >
            {" "}
            Login Now
          </span>
        </p>
      </div>

      {/* <button
        onClick={() => router.push("/login")}
        className="fixed z-10 px-4 py-2 font-semibold uppercase bg-gray-200 rounded-lg lg:right-12 lg:bottom-8 hover:bg-gray-300 right-2 bottom-1"
      >
        Next
      </button> */}
      <ToastContainer />
      <Loader />
    </div>
  );
};

export default SignUp;
