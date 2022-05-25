import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import {
  BellIcon,
  HomeIcon,
  MailIcon,
  ViewGridIcon,
} from "@heroicons/react/outline";
import Notifications from "./Notifications";

import { useRecoilState } from "recoil";
import { modalState, notificationCountState } from "../atoms/modalAtom";

const Nav = ({ active }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useRecoilState(modalState);
  let Ncount = [];
  const [notificationsCount, setNotificationsCount] = useRecoilState(
    notificationCountState
  );

  // console.log("checking notification recoilstate in nav", notificationsCount);

  // notificationsCount?.map((item, index) => {
  //   let Ncount = [];
  //   console.log("checking notifications in map == in nav ==", item.ReadStatus);
  //   if (item?.ReadStatus == 0) {
  //     Ncount.push(item);
  //     setNotificationsCount(item);
  //   }
  //   console.log("Now Now Now checking actual COUNTS ==> ", Ncount.length);
  // });

  // setTimeout(() => {
  // console.log(
  //   "Checking notifications array in  Nav after time out  ==> ",
  //   notificationsCount
  // );
  // });

  // const handleOpen = () => {};
  useEffect(() => {
    getNotificationCount();
  }, []);

  const getNotificationCount = () => {
    notificationsCount?.map((item, index) => {
      if (item?.ReadStatus == 0) {
        Ncount.push(item);
        setNotificationsCount(item);
        // console.log(
        //   "checking notifications in map == in nav ==",
        //   item.ReadStatus
        // );
      }
      // console.log("Now Now Now checking actual COUNTS ==> ", Ncount.length);
    });
  };

  const goToHome = () => {
    router.push("/home");
    setIsOpen(false);
  };

  const goToMessages = () => {
    router.push("/messeges");
    setIsOpen(false);
  };

  const goToSettings = () => {
    router.push("/settings");
    setIsOpen(false);
  };

  return (
    <>
      <div className="sticky top-0 z-10 bg-white">
        <nav className="fixed bottom-0 z-10 justify-around bg-white md:shadow-[0_4px_40px_0px_rgba(0,0,0,0.1)] shadow-[0_4px_40px_0px_rgba(0,0,0,0.15)] md:static">
          <header className="flex items-center justify-between md:max-w-6xl p-2 mx-auto bg-white min-w-[100vw] md:min-w-max">
            <div className="relative hidden h-14 cursor-pointer md:w-48 md:inline-block">
              <Image
                src="/logo.png"
                alt="infoImg"
                layout="fill"
                objectFit="contain"
              />
            </div>
            <div
              className="z-10 border-black flex justify-between bg-white md:max-w-[490px] max-w-[100vw] -ml-2 md:px-0 sm:px-10 px-8
          md:min-w-[445px] min-w-[100vw]
          "
            >
              <div
                onClick={goToHome}
                className={`z-10 flex items-center ${
                  active === "Home" ? "text-[#E9813B]" : "text-[#B7B7B7]"
                }  bg-white cursor-pointer opacity-100`}
              >
                <div className="relative w-[20px] mr-1 h-[18px]">
                  <Image
                    src={`${
                      active === "Home" ? "/activeHome.png" : "/home.png"
                    } `}
                    alt="infoImg"
                    layout="fill"
                    objectfit="contain"
                  />
                </div>
                <span className="hidden md:inline-block">Home</span>
              </div>
              <div
                onClick={goToMessages}
                className={`z-10 flex items-center
               ${active === "messeges" ? "text-[#E9813B]" : "text-[#B7B7B7]"} 
               bg-white cursor-pointer opacity-100`}
              >
                <div className="relative w-[20px] mr-1 h-[18px]">
                  <Image
                    src={`${
                      active === "messeges"
                        ? "/activeMessage.png"
                        : "/messege.png"
                    }`}
                    alt="infoImg"
                    layout="fill"
                    objectfit="contain"
                  />
                </div>
                <span className="hidden md:inline-block">Messeges</span>
              </div>
              <div
                onClick={() => setIsOpen(!isOpen)}
                className={`z-10 flex items-center ${
                  isOpen ? "text-[#E9813B]" : "text-[#B7B7B7]"
                }
               bg-white cursor-pointer opacity-100`}
              >
                <div className="relative w-[20px] mr-1 h-[18px] ">
                  <Image
                    src={`${
                      isOpen ? "/activeNotification.png" : "/notification.png"
                    }`}
                    alt="infoImg"
                    layout="fill"
                    objectfit="contain"
                  />
                  <div className="relative ">
                    <span className="bg-red-500  absolute  p-1 py-[0px]  flex items-center justify-center ml-1 text-xs text-white rounded-full font-strongg z-50 -top-[10px] md:-top-[12px] -right-[5px]">
                      {notificationsCount?.length > 0
                        ? notificationsCount?.length
                        : ""}
                    </span>
                  </div>
                </div>
                <span className="hidden md:inline-block">Notification</span>
              </div>
              <div
                onClick={goToSettings}
                className={`z-10 flex items-center
               ${active === "settings" ? "text-[#E9813B]" : "text-[#B7B7B7]"}
                bg-white opacity-100 cursor-pointer`}
              >
                <div className="relative w-[20px] mr-1 h-[18px]">
                  <Image
                    src={`${
                      active === "settings" ? "/activeGrid.png" : "/grid.png"
                    }`}
                    alt="infoImg"
                    layout="fill"
                    objectfit="contain"
                  />
                </div>
                <span className="hidden md:inline-block">Setting</span>
              </div>
            </div>
          </header>
        </nav>
      </div>
      {/* <Notifications /> */}
    </>
  );
};

export default Nav;
