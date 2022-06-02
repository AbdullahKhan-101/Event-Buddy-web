import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

import { ChevronRightIcon, UserAddIcon } from "@heroicons/react/outline";
import { modalState } from "../atoms/modalAtom";
import { useRecoilState } from "recoil";
import Switch from "@mui/material/Switch";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
const LeftSettingBar = () => {
  const router = useRouter();
  const label = { inputProps: { "aria-label": "Switch demo" } };
  const [isOpenN, setIsOpenN] = useRecoilState(modalState);
  const [user, setUser] = useState();
  useEffect(() => {
    getUserDetails();
    setIsOpenN(false);
  }, []);
  const getUserDetails = async () => {
    const User = await localStorage.getItem("user");
    const user = JSON.parse(User);
    setUser(user?.user);
  };
  const AvailableforInvitation = async (boolean) => {
    const JWT = localStorage.getItem("JWT");
    const params = new URLSearchParams();
    params.append("AvailableForInvitation", boolean);
    try {
      let fata = await axios.put("http://54.144.168.52:3000/user", params, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          authorization: JWT,
        },
      });
      console.log(fata, "api payload");
      if (fata?.data?.Data?.Message == "Updated") {
        localStorage.setItem(
          "user",
          JSON.stringify({
            user: fata?.data?.Data?.User,
          })
        );
        getUserDetails();
      }
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div>
      <div className="flex-grow md:max-w-[410px] bg-white">
        <div className="p-5 -mb-1 rounded-md md:mb-5 md:shadow-lg">
          <h1 className="text-2xl font-strongg text-[#0E134F] flex items-center justify-between">
            <span>Settings</span>
            <span className="flex text-sm items-center px-4 py-1 bg-[#FCEDE4] rounded-tl-full rounded-bl-full  float-right font-normal -mr-5">
              <UserAddIcon className="w-4 h-4 text-[#E9813B] mr-2" />
              <span className="text-[#E9813B] ">
                {user?.IsVerified == true ? "Verified" : "UnVerified"}
              </span>
            </span>
          </h1>
          <div>
            <div
              className="items-center hidden p-2 py-4 mt-4 bg-white rounded-lg shadow-md cursor-pointer md:flex md:-ml-2 md:shadow-none "
              onClick={() => router.push("/settings")}
            >
              <div className="relative w-[20px] mr-1 h-[18px]  text-[#E9813B] ">
                <Image
                  src="/user1.png"
                  alt="infoImg"
                  layout="fill"
                  objectfit="contain"
                />
              </div>
              <div className="flex items-center flex-grow ml-4 md:ml-4">
                <div className="flex-grow">
                  <h1 className="font-bold text-[#0E134F]">Profile Settings</h1>
                </div>
                <p className="mb-0 text-sm text-[#E9813B]  min-w-[30px] md:hidden flex items-center justify-center">
                  <ChevronRightIcon className="w-5 h-5 text-gray-400 cursor-pointer" />
                </p>
              </div>
            </div>
            <div
              onClick={() => router.push("/profileSettings")}
              className="flex items-center p-2 py-4 mt-4 bg-white rounded-lg shadow-md cursor-pointer md:-ml-2 md:shadow-none md:hidden"
            >
              <div className="relative w-[20px] mr-1 h-[18px]  text-[#E9813B] ">
                <Image
                  src="/user1.png"
                  alt="infoImg"
                  layout="fill"
                  objectfit="contain"
                />
              </div>
              <div className="flex items-center flex-grow ml-4 md:ml-4">
                <div className="flex-grow">
                  <h1 className="font-bold text-[#0E134F]">Profile Settings</h1>
                </div>
                <p className="mb-0 text-sm text-[#E9813B]  min-w-[30px] md:hidden flex items-center justify-center">
                  <ChevronRightIcon className="w-5 h-5 text-gray-400 cursor-pointer" />
                </p>
              </div>
            </div>
            <div
              onClick={() => router.push("/changePassword")}
              className="flex items-center p-2 py-4 mt-4 bg-white rounded-lg shadow-md cursor-pointer md:-ml-2 md:shadow-none"
            >
              <div className="relative w-[20px] mr-1 h-[18px]  text-[#E9813B] ">
                <Image
                  src="/lock.png"
                  alt="infoImg"
                  layout="fill"
                  objectfit="contain"
                />
              </div>
              <div className="flex items-center flex-grow ml-4 md:ml-4">
                <div className="flex-grow">
                  <h1 className="font-bold text-[#0E134F]">Change Password</h1>
                </div>
                <p className="mb-0 text-sm text-[#E9813B]  min-w-[30px] md:hidden flex items-center justify-center">
                  <ChevronRightIcon className="w-5 h-5 text-gray-400 cursor-pointer" />
                </p>
              </div>
            </div>
            <div
              onClick={() => router.push("/requestInvitaions")}
              className="flex items-center p-2 py-4 mt-4 bg-white rounded-lg shadow-md cursor-pointer md:-ml-2 md:shadow-none"
            >
              <div className="relative w-[20px] mr-1 h-[18px]  text-[#E9813B] ">
                <Image
                  src="/invitation.png"
                  alt="infoImg"
                  layout="fill"
                  objectfit="contain"
                />
              </div>
              <div className="flex items-center flex-grow ml-4 md:ml-4">
                <div className="flex-grow">
                  <h1 className="font-bold text-[#0E134F]">Invitations</h1>
                </div>
                <p className="mb-0 text-sm text-[#E9813B]  min-w-[30px] md:hidden flex items-center justify-center">
                  <ChevronRightIcon className="w-5 h-5 text-gray-400 cursor-pointer" />
                </p>
              </div>
            </div>
            <div className="flex items-center p-2 py-4 mt-4 bg-white rounded-lg shadow-md cursor-pointer md:-ml-2 md:shadow-none">
              <div className="relative w-[20px] mr-1 h-[18px]  text-[#E9813B] ">
                <Image
                  src="/ainvitation.png"
                  alt="infoImg"
                  layout="fill"
                  objectfit="contain"
                />
              </div>
              <div className="flex items-center flex-grow ml-4 md:ml-4">
                <div className="flex-grow">
                  <h1 className="font-bold text-[#0E134F]">
                    Available For Invitations
                  </h1>
                </div>
                <p className="mb-0 text-sm text-[#E9813B]  min-w-[30px]  flex items-center justify-center">
                  <Switch
                    {...label}
                    checked={user?.AvailableForInvitation}
                    size="small"
                    color="warning"
                    onChange={(e) => {
                      if (user?.AvailableForInvitation == true) {
                        AvailableforInvitation(0);
                      } else {
                        AvailableforInvitation(1);
                      }
                    }}
                  />
                </p>
              </div>
            </div>
            {/* <div className="flex items-center p-2 py-4 mt-4 bg-white rounded-lg shadow-md cursor-pointer md:-ml-2 md:shadow-none">
              <div className="relative w-[20px] mr-1 h-[18px]  text-[#E9813B] ">
                <Image
                  src="/verify.png"
                  alt="infoImg"
                  layout="fill"
                  objectfit="contain"
                />
              </div>
              <div className="flex items-center flex-grow ml-4 md:ml-4">
                <div className="flex-grow">
                  <h1 className="font-bold text-[#0E134F]">
                    Verify Your Account
                  </h1>
                </div>
                <p className="mb-0 text-sm text-[#E9813B]  min-w-[30px] md:hidden flex items-center justify-center">
                  <ChevronRightIcon className="w-5 h-5 text-gray-400 cursor-pointer" />
                </p>
              </div>
            </div> */}
            <div
              onClick={() => router.push("/privacyPolicy")}
              className="flex items-center p-2 py-4 mt-4 bg-white rounded-lg shadow-md cursor-pointer md:-ml-2 md:shadow-none"
            >
              <div className="relative w-[20px] mr-1 h-[18px]  text-[#E9813B] ">
                <Image
                  src="/privacy.png"
                  alt="infoImg"
                  layout="fill"
                  objectfit="contain"
                />
              </div>
              <div className="flex items-center flex-grow ml-4 md:ml-4">
                <div className="flex-grow">
                  <h1 className="font-bold text-[#0E134F]">Privacy Policy</h1>
                </div>
                <p className="mb-0 text-sm text-[#E9813B]  min-w-[30px] md:hidden flex items-center justify-center">
                  <ChevronRightIcon className="w-5 h-5 text-gray-400 cursor-pointer" />
                </p>
              </div>
            </div>
            <div className="flex items-center p-2 py-4 mt-4 bg-white rounded-lg shadow-md cursor-pointer md:-ml-2 md:shadow-none">
              <div className="relative w-[20px] mr-1 h-[18px]  text-[#E9813B] ">
                <Image
                  src="/logout.png"
                  alt="infoImg"
                  layout="fill"
                  objectfit="contain"
                />
              </div>
              <div className="flex items-center flex-grow ml-4 md:ml-4">
                <div
                  className="flex-grow"
                  onClick={() => {
                    router.push("/login");
                    localStorage.setItem("user", "");
                    localStorage.setItem("JWT", "");
                  }}
                >
                  <h1 className="font-bold text-[#0E134F]">Logout</h1>
                </div>
                <p className="mb-0 text-sm text-[#E9813B]  min-w-[30px] md:hidden flex items-center justify-center">
                  <ChevronRightIcon className="w-5 h-5 text-gray-400 cursor-pointer" />
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default LeftSettingBar;
