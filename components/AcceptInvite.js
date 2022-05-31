import {
  CalendarIcon,
  CheckIcon,
  ClockIcon,
  LocationMarkerIcon,
  XIcon,
} from "@heroicons/react/outline";
import React, { useEffect, useState } from "react";
import EnableLocation from "./EnableLocation";
import { useRouter } from "next/router";
import Invite from "./Invite";
import Person from "./Person";
import { Avatar } from "@mui/material";
import { acceptInviteModal, ClickNotificationData } from "../atoms/modalAtom";
import { useRecoilState } from "recoil";
import AOS from "aos";
import "aos/dist/aos.css";
import { useSpring, animated } from "react-spring";
import { imageBaseUrl } from "../config/utils";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { HomeActions } from "../store/actions";
import Geocode from "react-geocode";
import axios from "axios";
const AcceptInvite = () => {
  const [isOpen, setIsOpen] = useRecoilState(acceptInviteModal);
  const [jwt, setJwt] = useState();
  const [clickNotificationData, setClickNotificationData] = useRecoilState(
    ClickNotificationData
  );
  const [invitatioinAdd, setInvitatioinAdd] = useState("");
  const invitaionDetails = useSelector((state) => state?.Home?.Invitation_ById);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(HomeActions.InvitationById(clickNotificationData?.Id));
    getLocation();
  }, [clickNotificationData]);
  useEffect(() => {
    getLocation();
    getUserDetails();
  }, [invitaionDetails]);
  const styles = useSpring({
    opacity: isOpen === "open" ? 1 : 0,
    delay: isOpen === "open" ? 100 : 0,
  });
  const getUserDetails = async () => {
    const User = await localStorage.getItem("user");
    const user = JSON.parse(User);
    setJwt(user?.token);
    // console.log("========>", user?.token);
  };
  console.log("clickNotification", clickNotificationData);
  const router = useRouter();

  const getLocation = () => {
    if (invitaionDetails != undefined || invitaionDetails != null) {
      // console.log("invitaionDetails", invitaionDetails);
      Geocode.setApiKey("AIzaSyDh0f846bnmUxgSw6n5XtIZb01xtprxQfs");
      Geocode.setLanguage("en");
      Geocode.setRegion("es");
      Geocode.setLocationType("ROOFTOP");
      Geocode.enableDebug();

      Geocode.fromLatLng(
        invitaionDetails?.data?.Data?.Location.Lat,
        invitaionDetails?.data?.Data?.Location.Lng
      ).then(
        (response) => {
          const area = response.results[0].address_components[2].long_name;
          const city = response.results[0].address_components[3].long_name;
          const state = response.results[0].address_components[4].long_name;
          setInvitatioinAdd(`${area}, ${city}, ${state}`);
        },
        (error) => {
          console.error("--------->123", error);
        }
      );
    }
  };
  const AcceptInvitation = async (id) => {
    // console.log("Accepted", id);
    const JWT = localStorage.getItem("JWT");
    try {
      let fata = await axios.put(
        `http://54.144.168.52:3000/invitation/${id}/accept`,
        {
          headers: {
            authorization: JWT,
          },
        }
      );
      console.log(fata, "Accept Invitation Response");
      if (fata?.data?.Status == 200) {
        setIsOpen("close");
      }
    } catch (error) {
      // setIsLoading(false);
      // toast.error(error);
      console.log(error, "api payload");
    }
  };
  const RejectInvitation = async (id) => {
    // console.log("Rejected", invitaionDetails);
    const JWT = localStorage.getItem("JWT");
    try {
      let fata = await axios.put(
        `http://54.144.168.52:3000/invitation/${id}/reject`,
        {
          headers: {
            authorization: JWT,
          },
        }
      );
      console.log(fata, "Reject Invitation Response");
      if (fata?.data?.Status == 200) {
        setIsOpen("close");
      }
    } catch (error) {
      // setIsLoading(false);
      // toast.error(error);
      console.log(error, "api payload");
    }
  };
  return (
    <div>
      {isOpen === "open" && (
        <>
          <animated.div
            style={styles}
            className="w-[100%] h-[100vh] bg-white  bg-opacity-70  mx-auto mt-0 absolute top-0 right-0 left-0 z-10"
          >
            <div
              onClick={() => {
                setIsOpen("close");
                setClickNotificationData("");
                setInvitatioinAdd("");
              }}
              className="w-[100%] h-[100vh] bg-white fixed top-0  bg-opacity-60 right-0 left-0"
            ></div>

            <div className="fixed left-0 right-0 z-30 mx-auto text-center  -top-1 md:top-7 max-w-[100px] h-[100px] flex justify-center items-center">
              <Avatar
                src={
                  imageBaseUrl + invitaionDetails?.data?.Data?.User?.Media?.Path
                }
                sx={{ width: 70, height: 70 }}
              ></Avatar>
            </div>

            <div className="fixed rounded-xl z-20 p-6 md:p-10 bg-white  shadow-2xl top-10 w-[95%] max-w-[600px] mx-auto right-0 left-0 md:top-20">
              <h1 className=" text-[#0E134F]  text-2xl text-center  px-1 font-strongg flex items-center mt-10 md:mt-3">
                <span className="flex-grow">
                  {invitaionDetails?.data?.Data?.Title}
                </span>
              </h1>
              <p className="my-2 text-center">
                Invite By:{" "}
                <span className="underline text-[#ED974B] font-semibold cursor-pointer">
                  {invitaionDetails?.data?.Data?.CreatedBy?.FullName}
                </span>
              </p>
              <h4 className="text-[#0E134F] font-strongg mt-12 md:text-xl md:text-center">
                Event Messege
              </h4>
              <p className="mt-2 md:text-center text-[14px] text-gray-400 md:text-base font-normall">
                {invitaionDetails?.data?.Data?.Description}
              </p>
              <div className="items-center mt-4 md:flex md:justify-evenly">
                <p className="flex items-center mt-7 mb-7">
                  <CalendarIcon className="w-5 h-5 text-[#ED974B]" />
                  <span className="ml-2 text-sm text-gray-500">
                    {moment(invitaionDetails?.data?.Data?.CreatedAt).format(
                      "LL"
                    )}
                  </span>
                </p>
                <p className="flex items-center mt-7 mb-7">
                  <LocationMarkerIcon className="w-5 h-5 text-[#ED974B]" />
                  <span className="ml-2 text-sm text-gray-500">
                    {invitaionDetails?.data?.Data?.Address}
                  </span>
                </p>
              </div>
              {invitaionDetails?.data?.Data?.Status == "pending" && (
                <div className="flex items-center">
                  <button
                    onClick={() =>
                      RejectInvitation(invitaionDetails?.data?.Data?.Id)
                    }
                    className="font-semibold mx-2 text-gray-400 flex bg-white items-center justify-center bg-gradient-to-tr  py-[10px] sm:py-3 px-7 rounded-full   border  w-[97%] mt-0 border-gray-400"
                  >
                    <XIcon className="w-6 h-6 -ml-3 text-gray-400" />
                    <span className="ml-1">Reject</span>
                  </button>
                  <button
                    className="font-semibold flex items-center mx-2 bg-[#ED974B] justify-center bg-gradient-to-tr  py-[10px] sm:py-3 px-7 rounded-full text-white from-[#E77334] to-[#ED974B] w-[97%] hover:from-[#ff6715] mt-0"
                    onClick={() =>
                      AcceptInvitation(invitaionDetails?.data?.Data?.Id)
                    }
                  >
                    <CheckIcon className="w-6 h-6 -ml-3 text-white" />
                    <span className="ml-1">Accept</span>
                  </button>
                </div>
              )}
            </div>
          </animated.div>
        </>
      )}
    </div>
  );
};

export default AcceptInvite;
