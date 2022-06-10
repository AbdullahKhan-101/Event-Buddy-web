import { CalendarIcon, ClockIcon } from "@heroicons/react/outline";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { useRecoilState } from "recoil";
import { inviteModal, usersDataModal } from "../atoms/modalAtom";
import { XIcon } from "@heroicons/react/solid";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";
import { useSpring, animated } from "react-spring";
import GooglePlaces from "./Map/GoogePlaces";
import Geocode from "react-geocode";
import { ToastContainer, toast } from "react-toastify";
import { baseUrl } from "../config/utils";
const Invite = () => {
  const [isOpen, setIsOpen] = useRecoilState(inviteModal);
  const [personDetails, setPersonDetails] = useRecoilState(usersDataModal);
  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventLat, setEventLat] = useState(0);
  const [eventLng, setEventLng] = useState(0);
  const [eventAddress, setEventAddress] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [add, setAdd] = useState("");
  const [userId, setUserId] = useState();
  const styles = useSpring({
    opacity: isOpen === "open" ? 1 : 0,
    delay: isOpen === "open" ? 120 : 0,
  });

  // console.log("Personaol Deatails", personDetails);
  const createInvitation = async () => {
    if (
      !eventName ||
      !eventDescription ||
      !eventLat ||
      !eventLng ||
      !eventAddress ||
      !eventDate ||
      !eventTime
    ) {
      alert("Please Fill All Fields");
    } else {
      const payload = {
        Title: eventName,
        Description: eventDescription,
        Time: new Date(`${eventDate} ${eventTime}`).toISOString(),
        Lat: eventLat,
        Lng: eventLng,
        Address: eventAddress,
        UserId: personDetails?.Id,
      };
      // console.log(payload, "api payload");
      try {
        let fata = await axios.post(`${baseUrl}invitation`, payload, {
          headers: {
            "Content-Type": "application/json",
            authorization: userId?.token,
          },
        });
        // console.log(fata, "api payload");
        setIsOpen("close");
      } catch (error) {}
    }
  };

  useEffect(() => {
    AOS.init();
    getUserData();
  }, []);

  const getUserData = async () => {
    let user = await localStorage.getItem("user");
    const userData = JSON.parse(user);
    setUserId(userData);
  };

  const getLocation = async (e) => {
    Geocode.setApiKey("AIzaSyDh0f846bnmUxgSw6n5XtIZb01xtprxQfs");
    Geocode.setLanguage("en");
    Geocode.setRegion("es");
    Geocode.setLocationType("ROOFTOP");
    Geocode.enableDebug();
    Geocode.fromAddress(e.label).then(
      (res) => {
        const address = res.results[0].formatted_address;
        const lat = res.results[0].geometry.location.lat;
        const lng = res.results[0].geometry.location.lng;
        setEventAddress(address);
        setEventLat(lat);
        setEventLng(lng);
      },
      (error) => {}
    );
  };

  return (
    <div>
      {isOpen === "open" && (
        <div className="z-20">
          <div
            onClick={() => setIsOpen("close")}
            className="w-[100%] h-[100vh] bg-white fixed top-0  bg-opacity-60 right-0 left-0"
          ></div>
          <animated.div
            style={styles}
            className="fixed  rounded-xl p-4 md:p-10  shadow-2xl top-10 w-[95%] max-w-[640px] mx-auto right-0 left-0 md:top-20 z-20 bg-white"
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
                      setEventTime(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div style={{ width: "66vh" }}>
                <GooglePlaces
                  value={add}
                  onChange={(e) => {
                    setAdd(e);
                    getLocation(e);
                  }}
                  selectProps={{
                    styles: { color: "red" },
                  }}
                  placeholder="Event Location"
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
      <ToastContainer />
    </div>
  );
};

export default Invite;
