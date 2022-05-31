import {
  CalendarIcon,
  ClockIcon,
  LocationMarkerIcon,
} from "@heroicons/react/outline";
import React, { useState } from "react";
import Person from "./Person";
import { useRouter } from "next/router";
import { StarIcon, XIcon } from "@heroicons/react/solid";
import { reviewModal } from "../atoms/modalAtom";
import { useRecoilState } from "recoil";
import { useSpring, animated } from "react-spring";

const Review = () => {
  const [openReview, setOpenReview] = useRecoilState(reviewModal);

  const styles = useSpring({
    opacity: openReview ? 1 : 0,
    delay: openReview ? 120 : 0,
  });

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [active, setActive] = useState("");
  const router = useRouter();

  return (
    <>
      {openReview && (
        <>
          <animated.div
            style={styles}
            className="fixed top-0 right-0 bg-white w-[100%] h-[100vh] bg-opacity-50"
          >
            <div
              onClick={() => setOpenReview(false)}
              className="w-[100%] h-[100vh] bg-white fixed top-0  bg-opacity-20 right-0 left-0 "
            ></div>
            <div className="fixed rounded-xl p-4 md:p-10 bg-white shadow-2xl top-11 w-[95%] max-w-[640px] mx-auto right-0 left-0 md:top-28 z-10">
              <h1 className=" text-[#0E134F]  text-2xl text-center  px-1 font-bold flex items-center">
                <span className="flex-grow font-lgstrong">Write Review</span>
              </h1>
              <div className="flex items-center justify-center mx-auto mt-8 text-center">
                <StarIcon
                  onClick={() => {
                    active == 1 ? setActive("0") : setActive("1");
                  }}
                  className={`w-10 h-10 ${
                    active >= 1 ? "text-[#E9813B]" : "text-gray-300"
                  }  `}
                />
                <StarIcon
                  onClick={() => {
                    setActive("2");
                  }}
                  className={`w-10 h-10 ${
                    active >= 2 ? "text-[#E9813B]" : "text-gray-300"
                  }  `}
                />
                <StarIcon
                  onClick={() => {
                    setActive("3");
                  }}
                  className={`w-10 h-10 ${
                    active >= 3 ? "text-[#E9813B]" : "text-gray-300"
                  }  `}
                />
                <StarIcon
                  onClick={() => {
                    setActive("4");
                  }}
                  className={`w-10 h-10 ${
                    active >= 4 ? "text-[#E9813B]" : "text-gray-300"
                  }  `}
                />
                <StarIcon
                  onClick={() => {
                    setActive("5");
                  }}
                  className={`w-10 h-10 ${
                    active >= 5 ? "text-[#E9813B]" : "text-gray-300"
                  }  `}
                />
              </div>

              <div className="px-2 py-3 my-6 space-y-5 ">
                <div className="flex items-center pl-2 bg-white border rounded-xl">
                  <input
                    type="text"
                    placeholder="Event Name"
                    className="block w-full p-4 border-none outline-none rounded-xl font-normall"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="flex items-center pl-2 bg-white border rounded-xl ">
                  <textarea
                    type="text"
                    placeholder="Event Description"
                    className="block w-full p-4 border-none outline-none resize-none rounded-xl font-normall"
                    rows="3"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
              </div>
              <button className="font-semibold mx-2 bg-[#ED974B] bg-gradient-to-tr  py-[10px] sm:py-3 px-7 rounded-full text-white from-[#E77334] to-[#ED974B] w-[97%] hover:from-[#ff6715] mt-0">
                Send
              </button>
              <XIcon
                onClick={() => {
                  setOpenReview(false);
                  setActive("0");
                }}
                className="absolute p-1 text-gray-500 bg-white border rounded-full cursor-pointer h-9 w-9 -right-2 -top-5"
              />
            </div>
          </animated.div>
        </>
      )}
    </>
  );
};

export default Review;
