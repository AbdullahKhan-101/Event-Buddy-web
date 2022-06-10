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
import {
  inviteModal,
  usersDataModal,
  sendMessageModal,
  sendMessageId,
} from "../atoms/modalAtom";
import { XIcon } from "@heroicons/react/solid";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";
import { useSpring, animated } from "react-spring";
import moment from "moment";
import GooglePlaces from "./Map/GoogePlaces";
import Geocode from "react-geocode";
import { ToastContainer, toast } from "react-toastify";

const SendMessage = () => {
  const [isOpen, setIsOpen] = useRecoilState(inviteModal);
  const [isSMOpen, setIsSMOpen] = useRecoilState(sendMessageModal);
  const [personDetails, setPersonDetails] = useRecoilState(usersDataModal);
  const [message, setMessage] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventLat, setEventLat] = useState(0);
  const [eventLng, setEventLng] = useState(0);
  const [eventAddress, setEventAddress] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [add, setAdd] = useState("");
  const [eventDateandTime, setEventDateandTime] = useState("");
  const [sMID, setSMID] = useRecoilState(sendMessageId);
  const [userId, setUserId] = useState();
  const styles = useSpring({
    opacity: isSMOpen === "open" ? 1 : 0,
    delay: isSMOpen === "open" ? 120 : 0,
  });
  // console.log(personDetails, "api payload");

  const router = useRouter();
  const dispatch = useDispatch();
  // console.log("sMID", sMID);
  const createChat = async () => {
    const jwt = localStorage.getItem("JWTEventBuddy");
    if (!message) {
      // toast.error("Please Fill All Fields");
      // setIsLoading(false);
      // alert("Please Fill All Fields");
    } else {
      const payload = {
        Message: message,
        InvitationId: sMID?.Meta?.InvitationId,
      };
      // console.log(payload, "api payload");
      try {
        let fata = await axios.post("http://54.144.168.52:3000/chat", payload, {
          headers: {
            "Content-Type": "application/json",
            authorization: jwt,
          },
        });
        // console.log(fata, "api payload");
        if (fata?.data?.Status == 200) {
          setIsSMOpen("close");
          router.push("/messeges");
        }
      } catch (error) {
        // setIsLoading(false);
        // toast.error(error);
        // console.log(error, "error chat");
        // console.log("if user error", isLoading);
      }
    }
  };

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div>
      {isSMOpen === "open" && (
        <div className="z-20">
          <div
            onClick={() => setIsSMOpen("close")}
            className="w-[100%] h-[100vh] bg-white fixed top-0  bg-opacity-60 right-0 left-0"
          ></div>
          <animated.div
            style={styles}
            className="fixed  rounded-xl p-4 md:p-10  shadow-2xl top-10 w-[95%] max-w-[640px] mx-auto right-0 left-0 md:top-20 z-20 bg-white"
          >
            <h1 className=" text-[#0E134F]  text-2xl text-center  px-1 font-strongg flex items-center">
              <span className="flex-grow">
                Send Messege To {sMID?.Meta?.User?.FullName}
              </span>
            </h1>
            <div className="px-2 py-3 my-6 space-y-5 ">
              <div className="flex items-center pl-2 bg-white border rounded-xl">
                <input
                  type="text"
                  placeholder="Write here"
                  className="block w-full p-9 border-none outline-none rounded-xl"
                  onChange={(e) => {
                    setMessage(e.target.value);
                    // console.log(eventName);
                  }}
                />
              </div>
            </div>
            <button
              onClick={createChat}
              className="font-semibold mx-2 bg-[#ED974B] bg-gradient-to-tr  py-[10px] sm:py-3 px-7 rounded-full text-white from-[#E77334] to-[#ED974B] w-[97%] hover:from-[#ff6715] mt-0"
            >
              Send
            </button>
            <XIcon
              onClick={() => setIsSMOpen("close")}
              className="absolute p-1 text-gray-500 bg-white border rounded-full cursor-pointer h-9 w-9 -right-2 -top-5"
            />
          </animated.div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default SendMessage;
