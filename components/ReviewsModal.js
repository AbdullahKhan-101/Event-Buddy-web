import React, { useState } from "react";
import Image from "next/image";
import { StarIcon, XIcon } from "@heroicons/react/solid";
import { useSpring, animated } from "react-spring";
import { useRecoilState } from "recoil";
import { openReviewsModall } from "../atoms/modalAtom";

const dummyReviews = [
  {
    img: "/man1.png",
    name: "Kelly Bishop",
    description: "Amazing event atmosphere",
    time: "8m ago",
    rating: "5",
  },
  {
    img: "/man1.png",
    name: "Kelly Bishop",
    description: "Amazing event atmosphere",
    time: "8m ago",
    rating: "3",
  },
  {
    img: "/man1.png",
    name: "Kelly Bishop",
    description: "Amazing event atmosphere",
    time: "8m ago",
    rating: "2",
  },
  {
    img: "/man1.png",
    name: "Kelly Bishop",
    description: "Amazing event atmosphere",
    time: "8m ago",
    rating: "2",
  },
  {
    img: "/man1.png",
    name: "Kelly Bishop",
    description: "Amazing event atmosphere",
    time: "8m ago",
    rating: "2",
  },
  {
    img: "/man1.png",
    name: "Kelly Bishop",
    description: "Amazing event atmosphere",
    time: "8m ago",
    rating: "2",
  },
];

const ReviewsModal = () => {
  const [openReviewsModal, setOpenReviewsModal] =
    useRecoilState(openReviewsModall);

  const styles = useSpring({
    opacity: openReviewsModal ? 1 : 0,
    delay: openReviewsModal ? 100 : 0,
  });

  return (
    <>
      {openReviewsModal && (
        <animated.div
          style={styles}
          className="fixed top-0 right-0 bg-white w-[100%] h-[100vh] bg-opacity-70 z-50"
        >
          <div className=" md:max-w-[680px] md:max-h-[68vh] max-h-[75vh]  flex-grow lg:-mt-48">
            <div
              className="fixed md:max-h-[68vh] max-h-[75vh] scrollbar-hide overflow-y-scroll overflow-x-hidden rounded-xl p-4 md:p-10 bg-white shadow-2xl top-11 w-[95%] max-w-[640px] mx-auto right-0 left-0 md:top-20"
              //   className={`
              //     ${isOpen === "open" ? "opacity-30" : "opacity-100"}
              //    p-5 mt-4 mb-8 md:shadow-[0_5px_30px_-13px_rgba(0,0,0,0.3)] md:rounded-lg
              //    `}
            >
              <h1 className="text-2xl font-bold text-[#0E134F]">Reviews</h1>
              {/* three cards here */}
              <div>
                {dummyReviews.map((item, index) => {
                  return (
                    <div key={index}>
                      <div className="flex items-center py-4 mt-2 ">
                        <div className="relative flex-grow-0 sm:mt-0 mt-0  max-w-[100%] w-[55px] h-[55px]  min-w-[55px]">
                          <Image
                            src={item.img}
                            layout="fill"
                            objectFit="contain"
                            className="rounded-full"
                          />
                        </div>
                        <div className="flex items-center flex-grow ml-4 md:ml-6">
                          <div className="flex-grow">
                            <h1 className="font-strongg text-[#0E134F] text[16px]">
                              {item.name}
                            </h1>
                            <div className="flex my-[1px]">
                              <StarIcon className="h-5 text-[#E9813B]" />
                              <StarIcon className="h-5 text-[#E9813B]" />
                              <StarIcon className="h-5 text-[#E9813B]" />
                              <StarIcon className="h-5 text-[#E9813B]" />
                            </div>
                            <h1 className="text-sm text-gray-800 font-normall">
                              {item.description}
                            </h1>
                          </div>
                          <p className="text-sm text-gray-400">{item.time}</p>
                        </div>
                      </div>
                      <hr className="md:w-[87%] w-[80%] mx-auto border-gray-200 md:ml-20 text-cyan-600 ml-16" />
                    </div>
                  );
                })}
              </div>
              <XIcon
                onClick={() => setOpenReviewsModal(false)}
                className="absolute top-0 right-0 p-1 text-gray-500 bg-white border rounded-full cursor-pointer h-9 w-9"
              />
            </div>
          </div>
        </animated.div>
      )}
    </>
  );
};

export default ReviewsModal;
