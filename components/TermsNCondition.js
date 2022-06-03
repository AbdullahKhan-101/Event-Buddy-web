import React from "react";
import Nav from "./Nav";
import LeftSettingBar from "./LeftSettingBar";
import { useRouter } from "next/router";
import { ChevronLeftIcon } from "@heroicons/react/outline";
import Notifications from "./Notifications";
const TermsNCondition = () => {
  const router = useRouter();

  return (
    <div>
      <Nav active="settings" />
      <div className="p-2 mx-auto mt-0 max-w-7xl md:mt-5 "></div>
      <div className="flex flex-wrap mx-auto justify-evenly max-w-7xl ">
        <div className="flex-grow md:max-w-[410px] bg-white hidden md:block">
          <LeftSettingBar />
        </div>

        <div className="md:max-w-[700px] flex-grow bg-white md:shadow-lg md:rounded-lg ">
          <div className="p-5">
            <h1 className="text-[#0E134F]  text-xl text-center sm:px-2 px-1 font-strongg flex items-center">
              <span
                className="flex-grow-0 float-left cursor-pointer md:hidden"
                onClick={() => router.push("/settings")}
              >
                <ChevronLeftIcon className="h-6 w-6 sm:w-8 sm:h-8 text-[#E9813B]" />
              </span>
              <span className="flex-grow md:flex-grow-0">
                Terms And Condition
              </span>
            </h1>
          </div>
          <hr className="w-[100%] mx-auto border-gray-200" />
          <div className="p-5 mt-4 ">
            <h1 className="text-lg font-mediumm text-[#E9813B]">
              Terms For Use
            </h1>
            <p className="text-sm text-[#42526E] opacity-70 mt-2">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ratione
              iusto nobis mollitia, animi explicabo debitis modi ipsum dolorem
              velit dicta. Lorem ipsum dolor sit amet consectetur adipisicing
              elit Lorem ipsum dolor sit.
            </p>
            <h1 className="text-lg font-mediumm text-[#E9813B] mt-8">
              Request Accepting/Rejecting
            </h1>
            <p className="text-sm text-[#42526E] opacity-70 mt-2">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ratione
              iusto nobis mollitia, animi explicabo debitis modi ipsum dolorem
              velit dicta. Lorem ipsum dolor sit amet consectetur adipisicing
              elit Lorem ipsum dolor sit.
            </p>
          </div>
        </div>
      </div>

      <Notifications />
    </div>
  );
};

export default TermsNCondition;
