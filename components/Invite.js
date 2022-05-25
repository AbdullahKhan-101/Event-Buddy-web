import {
  CalendarIcon,
  ClockIcon,
  LocationMarkerIcon,
} from "@heroicons/react/outline";
import React, { useEffect, useState } from "react";
import Person from "./Person";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { HomeActions } from "../store/actions";
import { useRecoilState } from "recoil";
import { inviteModal } from "../atoms/modalAtom";
import { XIcon } from "@heroicons/react/solid";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";
import { useSpring, animated } from "react-spring";
import moment from "moment";
const Invite = () => {
  const [isOpen, setIsOpen] = useRecoilState(inviteModal);
  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventLat, setEventLat] = useState(0);
  const [eventLng, setEventLng] = useState(0);
  const [eventAddress, setEventAddress] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [eventDateandTime, setEventDateandTime] = useState("");
  const [userId, setUserId] = useState();
  const styles = useSpring({
    opacity: isOpen === "open" ? 1 : 0,
    delay: isOpen === "open" ? 120 : 0,
  });

  const router = useRouter();
  const dispatch = useDispatch();

  const createInvitation = async () => {
    // if (
    //   !eventName ||
    //   !eventDescription ||
    //   !eventLat ||
    //   !eventLng ||
    //   !eventAddress ||
    //   !eventDate ||
    //   !eventTime
    // ) {
    //   toast.error("Please Fill All Fields");
    //   // setIsLoading(false);
    // } else {
    const payload = {
      Title: eventName,
      Description: eventDescription,
      Time: new Date(`${eventDate} ${eventTime}`).toISOString(),
      Lat: 24.916682,
      Lng: 67.1229623,
      Address: "Testing",
      UserId: userId?.user?.Id,
    };
    // try {
    //   let fata = await axios.post(
    //     "http://54.144.168.52:3000/invitation",
    //     payload,
    //     {
    //       headers: {
    //         "Content-Type": "application/json",
    //         authorization: userId?.token,
    //       },
    //     }
    //   );
    //   console.log(fata, "api payload");
    //   if (fata?.data?.Status == 200) {
    //     if (!fata?.data?.Data?.User?.Media) {
    //       // setIsLoading(false);
    //       // setEmail("");
    //       // setPassword("");
    //       // router.push("/uploadPicture");
    //       // console.log("if 200", isLoading);
    //     } else if (!fata?.data?.Data?.User?.SelfieMedia) {
    //       // setIsLoading(false);
    //       // setEmail("");
    //       // setPassword("");
    //       // router.push("/selfie");
    //       // console.log("if Selfie Media", isLoading);
    //     } else {
    //       // dispatch(
    //       //   HomeActions.userDetails({
    //       //     user: fata?.data?.Data?.User,
    //       //     token: fata?.data?.Data?.Token,
    //       //   })
    //       // );
    //       // localStorage.setItem(
    //       //   "user",
    //       //   JSON.stringify({
    //       //     user: fata?.data?.Data?.User,
    //       //     token: fata?.data?.Data?.Token,
    //       //   })
    //       // );
    //       // localStorage.setItem("JWT", fata?.data?.Data?.Token);
    //       // router.push("/home");
    //       // setIsLoading(false);
    //       // setEmail("");
    //       // setPassword("");
    //       // console.log("if localstorage", isLoading);
    //     }
    //   } else {
    //     // toast.error(fata?.data?.Message);
    //     // console.log(fata, "api payload");
    //     // toast.error(fata?.data?.Message);
    //     // setIsLoading(false);
    //     // console.log("if apierror", isLoading);
    //     // throw new Error(fata?.data);
    //   }
    // } catch (error) {
    //   // setIsLoading(false);
    //   // toast.error(error);
    //   // console.log(error, "api payload");
    //   // console.log("if user error", isLoading);
    // }
    // }
  };

  useEffect(() => {
    AOS.init();
    getUserData();
  }, []);

  const getUserData = async () => {
    let user = await localStorage.getItem("user");
    const userData = JSON.parse(user);
    // console.log("------------>nnnn", userData?.user?.Id);
    setUserId(userData);
  };
  return (
    <div>
      {isOpen === "open" && (
        <div className="z-50">
          {/* <div className="z-50 bg-opacity-20 md:bg-opacity-10"> */}
          {/* <Person /> */}
          {/* </div> */}
          <animated.div
            style={styles}
            className="fixed  rounded-xl p-4 md:p-10  shadow-2xl top-10 w-[95%] max-w-[640px] mx-auto right-0 left-0 md:top-20 z-50 bg-white"
          >
            <h1 className=" text-[#0E134F]  text-2xl text-center  px-1 font-strongg flex items-center">
              <span className="flex-grow">Invitation Messege</span>
            </h1>
            <div className="px-2 py-3 my-6 space-y-5 ">
              <div className="flex items-center pl-2 bg-white border rounded-xl">
                <input
                  type="text"
                  placeholder="Event Name"
                  className="block w-full p-4 border-none outline-none rounded-xl"
                  onChange={(e) => {
                    setEventName(e.target.value);
                    // console.log(eventName);
                  }}
                />
              </div>
              <div className="flex justify-between">
                <div className="flex items-center w-5/12 pl-2 bg-white border rounded-xl">
                  <span>
                    <CalendarIcon className="w-5 h-5 text-[#ED974B]" />
                  </span>
                  <input
                    type="date"
                    placeholder="Pick Date"
                    className="block w-full p-4 text-gray-400 border-none outline-none rounded-xl"
                    onChange={(e) => {
                      // console.log(e.target.value);
                      setEventDate(e.target.value);
                    }}
                  />
                </div>
                <div className="flex items-center w-5/12 pl-2 bg-white border rounded-xl">
                  <span>
                    <ClockIcon className="w-5 h-5 text-[#ED974B]" />
                  </span>
                  <input
                    type="time"
                    placeholder="Pick Time"
                    className="block w-full p-4 text-gray-400 border-none outline-none rounded-xl"
                    onChange={(e) => {
                      // console.log(e.target.value);
                      setEventTime(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="flex items-center pl-2 bg-white border rounded-xl">
                <span>
                  <LocationMarkerIcon className="w-5 h-5 text-[#ED974B]" />
                </span>
                <input
                  type="text"
                  placeholder="Event Location"
                  className="block w-full p-4 border-none outline-none rounded-xl"
                />
              </div>
              <div className="flex items-center pl-2 bg-white border rounded-xl ">
                <textarea
                  type="text"
                  placeholder="Event Description"
                  rows="3"
                  className="block w-full p-4 border-none outline-none resize-none rounded-xl"
                  onChange={(e) => setEventDescription(e.target.value)}
                />
              </div>
            </div>
            <button
              onClick={createInvitation}
              className="font-semibold mx-2 bg-[#ED974B] bg-gradient-to-tr  py-[10px] sm:py-3 px-7 rounded-full text-white from-[#E77334] to-[#ED974B] w-[97%] hover:from-[#ff6715] mt-0"
            >
              Send
            </button>
            <XIcon
              onClick={() => setIsOpen("close")}
              className="absolute p-1 text-gray-500 bg-white border rounded-full cursor-pointer h-9 w-9 -right-2 -top-5"
            />
          </animated.div>
        </div>
      )}
      {/* yhan tk */}
    </div>
  );
};

export default Invite;
