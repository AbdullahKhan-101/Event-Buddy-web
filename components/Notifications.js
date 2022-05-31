import React, { Fragment, useEffect, useState } from "react";
import Person from "./Person";
import Nav from "./Nav";
import Image from "next/image";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { HomeActions } from "../store/actions";
import { Dialog, Transition } from "@headlessui/react";
import { useRecoilState } from "recoil";
import {
  acceptInviteModal,
  ClickNotificationData,
  modalState,
  notificationCountState,
} from "../atoms/modalAtom";
import AcceptInvite from "./AcceptInvite";
import AOS from "aos";
import "aos/dist/aos.css";
import { useSpring, animated } from "react-spring";
import { imageBaseUrl } from "../config/utils";
import Moment from "react-moment";
import moment from "moment";

const Notifications = () => {
  const [isOpen, setIsOpen] = useRecoilState(modalState);
  const [clickNotificationData, setClickNotificationData] = useRecoilState(
    ClickNotificationData
  );
  const [notificationsCount, setNotificationsCount] = useRecoilState(
    notificationCountState
  );

  const notifications = useSelector((state) => state?.Home?.notifications);
  const notificationsData = notifications?.data?.Data?.notifications;

  const styles = useSpring({
    opacity: isOpen ? 1 : 0,
    transform: isOpen ? "translate3d(0,0,0)" : "translate3d(0,-50px,0)",
  });

  const [inviteModal, setInviteModal] = useRecoilState(acceptInviteModal);

  const dispatch = useDispatch();
  const router = useRouter();
  const [notificationSuccess, setNotificationSuccess] = useState([]);
  setNotificationsCount(notificationsData);

  useEffect(() => {
    AOS.init();
    dispatch(HomeActions.Notifications());

    setTimeout(() => {
      // console.log("checking length in useEffect", notificationsCount);
      setNotificationsCount(notificationsData);
    }, 1000);
  }, []);

  // const notificationCount = () => {
  // let notificationCount = [];

  // notifications?.data?.Data?.notifications?.map((item, index) => {
  //   console.log("checking item here", item);

  //   if (item?.ReadStatus == 0) {
  //     notificationCount.push(item);
  //   }
  //   // console.log("checking notifications status ", item);
  // });
  // console.log("checking notifications count  ==> ", .length);
  // };
  // console.log("notifications Count here ==> ", notificationsData);

  // setNotificationsCount(notificationCount.length);

  const dymmyData = [
    {
      img: "/man2.png",
      time: "8m ago",
      description: `Amazing event organizer Lorem event organizer Lorem 
      event organizer Lorem`,
    },
    {
      img: "/man2.png",
      time: "8m ago",
      description: `Amazing event organizer Lorem ipsum dolor sit amet
      consectetur adipisicing elit. Ut, quas.`,
    },
    {
      img: "/man2.png",
      time: "8m ago",
      description: `Amazing event organizer Lorem ipsum dolor sit amet
      consectetur adipisicing elit. Ut, quas.`,
    },
  ];

  return (
    <div>
      {isOpen && (
        <animated.div
          style={styles}
          className="flex-grow md:max-w-[410px] bg-white md:inline-block fixed top-[15px] md:top-[90px] xl:right-36 lg:right-12 md:right-1"
        >
          <animated.div className="p-6 -mb-1 rounded-md md:mb-0 md:shadow-lg">
            <h1 className="text-2xl font-bold text-[#0E134F]">Notifications</h1>
            <div>
              {notificationsData?.map((item, index) => {
                return (
                  <div
                    onClick={() => {
                      console.log("------->", item);
                      setInviteModal("open");
                      setClickNotificationData({
                        ...item,
                        from: "notificationList",
                      });
                    }}
                    key={index}
                    className="flex items-center p-2 py-4 mt-1 bg-white rounded-lg shadow-md cursor-pointer md:-ml-2 md:shadow-none"
                  >
                    <div className="relative flex-grow-0 sm:mt-0 mt-0  max-w-[100%] w-[55px] h-[55px]  min-w-[55px]">
                      <Image
                        src={imageBaseUrl + item?.Meta?.User?.SelfieMedia?.Path}
                        layout="fill"
                        objectfit="contain"
                        className="rounded-xl"
                      />
                    </div>
                    <div className="flex items-center flex-grow ml-4 md:ml-4">
                      <div className="flex-grow">
                        <p className="mb-1 text-sm text-[#E9813B]  min-w-[50px]">
                          <Moment fromNow>{item?.CreatedAt}</Moment>
                          {/* {moment(item?.CreatedAt).format("hh: mm")} */}
                          {/* {moment(item?.CreatedAt, "YYYYMMDD").fromNow()} */}
                        </p>
                        <h1 className="text-sm text-gray-400 line-clamp-1">
                          {item?.Description}
                        </h1>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </animated.div>
        </animated.div>
      )}
      <AcceptInvite />
    </div>
  );
};

export default Notifications;
