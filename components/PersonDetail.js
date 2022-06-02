import { ChevronLeftIcon, HeartIcon } from "@heroicons/react/outline";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import {
  inviteModal,
  openReviewsModall,
  reviewModal,
  ClickNotificationData,
  sendMessageModal,
  sendMessageId,
  modalState,
} from "../atoms/modalAtom";
import Image from "next/image";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import { Alert } from "reactstrap";
const PersonDetail = ({ img, name, position, about, data }) => {
  const [isOpen, setIsOpen] = useRecoilState(inviteModal);
  const [isSMOpen, setIsSMOpen] = useRecoilState(sendMessageModal);
  const [isOpenN, setIsOpenN] = useRecoilState(modalState);
  const [user, setUser] = useState();
  const [clickNotificationData, setClickNotificationData] = useRecoilState(
    ClickNotificationData
  );
  const [sMID, setSMID] = useRecoilState(sendMessageId);
  const [openReviewsModal, setOpenReviewsModal] =
    useRecoilState(openReviewsModall);

  const router = useRouter();
  useEffect(() => {
    UserDetails();
  }, []);

  const UserDetails = async () => {
    const User = await localStorage.getItem("user");
    const user = JSON.parse(User);
    console.log("user", user);
    setUser(user?.user);
  };
  return (
    <div>
      <div>
        <div className={`${isOpen === "open" ? "opacity-30" : "opacity-100"} `}>
          <div
            className={`max-w-6xl p-2 mx-auto mt-6 md:mt-8 ${
              isOpen === "open" ? "opacity-30" : "opacity-100"
            }`}
          >
            <h1 className="md:font-lgstrong text-[#0E134F] md:text-4xl text-2xl text-center sm:px-2 px-1 font-strongg flex items-center md:hidden">
              <span
                className="flex-grow-0 float-left cursor-pointer"
                onClick={() => router.push("/home")}
              >
                <ChevronLeftIcon className="h-6 w-6 sm:w-8 sm:h-8 text-[#E9813B]" />
              </span>
              <span className="flex-grow text-[#0E134F]">{name}</span>
              <span>
                <HeartIcon className="h-6 w-6 sm:w-8 sm:h-8 text-[#E9813B]" />
              </span>
            </h1>
          </div>
          <div
            className={`flex flex-wrap justify-around max-w-6xl mx-auto ${
              isOpen === "open" ? "opacity-30" : "opacity-100"
            }`}
          >
            <div className="flex-grow md:max-w-[290px]   bg-white  ">
              <div className="p-4 -mb-1 rounded-md md:mb-5 md:shadow-[0_5px_30px_-15px_rgba(0,0,0,0.3)]">
                <div className="relative flex-grow sm:mt-0 mt-0  md:max-w-[100%] md:w-[125px] mx-auto  md:rounded-full cursor-pointer md:h-[125px]  min-w-[220px] sm:min-w-[110px] max-h-[280px] max-w-[97%] h-[280px] rounded-lg">
                  <Image
                    src={img}
                    layout="fill"
                    objectfit="cover"
                    className="rounded-lg md:rounded-full"
                  />
                </div>
                <div className="hidden mx-auto mt-4 text-center md:block">
                  <h1 className="text-xl font-strongg">{name}</h1>
                  <p className="mb-1 text-gray-400 font-normall text-[16px]">
                    {position}
                  </p>
                </div>
              </div>
              <div className="hidden mt-4 lg:block">
                <button
                  onClick={() => {
                    setOpenReviewsModal(true);
                    setIsOpenN(false);
                  }}
                  className="   bg-[#FCEDE4]   py-[10px] sm:py-3 px-7 rounded-full text-[#E9813B]   font-mediumm w-[100%] mt-2 border-[#ED974B]"
                >
                  More Reviews
                </button>
                {data?.from == "notification" ? (
                  <p
                    onClick={() => {
                      if (user?.IsVerified == true) {
                        setSMID(clickNotificationData);
                        setIsOpenN(false);
                        setIsSMOpen("open");
                      } else {
                        alert("Your Profile Is Not Verified");
                      }
                    }}
                    className="font-mediumm  bg-[#ED974B] flex items-center justify-center bg-gradient-to-tr  py-[10px] sm:py-3 px-7 rounded-full text-white from-[#E77334] to-[#ED974B]   w-[100%]  mt-3 cursor-pointer"
                  >
                    <div className="relative w-[20px] mr-2 h-[18px]  text-[#E9813B] ">
                      <Image
                        src="/sendMessage.png"
                        alt="infoImg"
                        layout="fill"
                        objectfit="contain"
                      />
                    </div>
                    Send Message
                  </p>
                ) : (
                  <p
                    onClick={() => {
                      if (user?.IsVerified == true) {
                        setIsOpen("open");
                        setIsOpenN(false);
                      } else {
                        alert("Your Profile Is Not Verified");
                      }
                    }}
                    className="font-mediumm  bg-[#ED974B] flex items-center justify-center bg-gradient-to-tr  py-[10px] sm:py-3 px-7 rounded-full text-white from-[#E77334] to-[#ED974B]   w-[100%]  mt-3 cursor-pointer"
                  >
                    <div className="relative w-[20px] mr-2 h-[18px]  text-[#E9813B] ">
                      <Image
                        src="/sendMessage.png"
                        alt="infoImg"
                        layout="fill"
                        objectfit="contain"
                      />
                    </div>
                    Send Invitaion
                  </p>
                )}
              </div>
            </div>
            <div className="md:max-w-[680px]  flex-grow  bg-white">
              <div className="p-5  min-w-[300px] md:shadow-[0_5px_30px_-15px_rgba(0,0,0,0.3)] md:rounded-lg">
                <h1 className="text-2xl font-strongg text-[#0E134F]">About</h1>
                <p className="mt-3 text-[#42526E] opacity-70 font-normall">
                  {about}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonDetail;
