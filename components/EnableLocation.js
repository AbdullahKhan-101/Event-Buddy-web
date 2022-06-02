import { ChevronLeftIcon } from "@heroicons/react/outline";
import React, { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

const EnableLocation = () => {
  const router = useRouter();
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [status, setStatus] = useState(null);

  const getLocation = () => {
    if (!navigator.geolocation) {
      setStatus("Geolocation is not supported by your browser");
    } else {
      setStatus("Locating...");
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setStatus(null);
          setLat(position.coords.latitude);
          setLng(position.coords.longitude);
          router.push("/search");
          localStorage.setItem(
            "userLatitude",
            JSON.stringify(position.coords.latitude)
          );
          localStorage.setItem(
            "userLongitude",
            JSON.stringify(position.coords.longitude)
          );
        },
        () => {
          setStatus("Unable to retrieve your location");
        }
      );
    }
  };
  return (
    <div>
      <div className="max-w-6xl p-2 mx-auto mt-8 ">
        <h1 className="md:font-lgstrong font-strongg text-[#0E134F]  md:text-[34px] text-2xl  text-center sm:px-2 px-1 font-bold flex items-center">
          <span
            className="flex-grow-0 float-left cursor-pointer"
            onClick={() => router.push("/verifyPicture")}
          >
            <ChevronLeftIcon className="h-6 w-6 sm:w-8 sm:h-8 text-[#E9813B]" />
          </span>
          <span className="flex-grow">Enable Location</span>
        </h1>
        <div className="relative mx-4 text-center  mt-20   w-[100%]  h-[240px] md:h-[390px]">
          <Image
            src="/location.png"
            layout="fill"
            objectfit="contain"
            className="rounded-xl"
          />
        </div>
        <p className="px-1 mt-8 text-center text-gray-600 font-normall md:mt-4 text-[14px] md:text-lg ">
          Please make sure to be in a spot with sufficient light on your face.
        </p>
        <div className="flex max-w-md mx-auto">
          <button
            onClick={getLocation}
            className="font-mediumm sm:mx-8 bg-[#ED974B] bg-gradient-to-tr  py-[10px] sm:py-3 px-7 rounded-full text-white from-[#ff6715] to-[#ED974B]  mx-auto text-center border w-[95%] hover:from-[#f07a2b] mt-24 md:mt-16"
          >
            Enable
          </button>
        </div>
      </div>
    </div>
  );
};

export default EnableLocation;
