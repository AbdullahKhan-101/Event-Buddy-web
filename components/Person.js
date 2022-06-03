import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { StarIcon } from "@heroicons/react/solid";
import Nav from "./Nav";
import { useDispatch, useSelector } from "react-redux";
import { HomeActions } from "../store/actions";
import Notifications from "./Notifications";
import {
  inviteModal,
  openReviewsModall,
  reviewModal,
  usersDataModal,
  sendMessageModal,
  modalState,
} from "../atoms/modalAtom";
import { useRecoilState } from "recoil";
import Invite from "./Invite";
import Script from "next/script";
import PersonDetail from "./PersonDetail";
import { imageBaseUrl } from "../config/utils";
import Review from "./Review";
import ReviewsModal from "./ReviewsModal";
import SendMessage from "./SendMessage";
const Person = ({ active }) => {
  const [isOpen, setIsOpen] = useRecoilState(inviteModal);
  const [isSMOpen, setIsSMOpen] = useRecoilState(sendMessageModal);
  const [openReview, setOpenReview] = useRecoilState(reviewModal);
  const [isOpenN, setIsOpenN] = useRecoilState(modalState);
  const [openReviewsModal, setOpenReviewsModal] =
    useRecoilState(openReviewsModall);
  const [usersData, setUsersData] = useRecoilState(usersDataModal);
  const dispatch = useDispatch();
  const router = useRouter();
  const [userByIdSuccess, setUserByIdSuccess] = useState([]);
  const [userReviewsSuccess, setUserReviewsSuccess] = useState([]);

  const userById = useSelector((state) => state?.Home?.UserById);
  const userReviews = useSelector((state) => state?.Home?.User_reviews);
  useEffect(() => {
    dispatch(HomeActions.UserById(usersData?.Id));
    dispatch(HomeActions.UserReviews(usersData?.Id));
    setIsOpenN(false);
  }, []);

  return (
    <div>
      <Script src="Google/location/AIzaSyBzpeVhVlmsD3zeg6482RCOe7PcYSweF9E"></Script>
      <div>
        <div
          className={`${isOpen === "open" ? "opacity-30" : "opacity-100"}
        ${openReview ? "opacity-90" : "opacity-100"}
        `}
        >
          <Nav active={active} />
        </div>
        <PersonDetail
          img={
            usersData?.from == "Home"
              ? imageBaseUrl + userById?.data?.Data?.Media?.Path
              : imageBaseUrl + usersData?.Media?.Path
          }
          name={
            usersData?.from == "Home"
              ? userById?.data?.Data?.FullName
              : usersData?.FullName
          }
          position={
            usersData?.from == "Home"
              ? userById?.data?.Data?.UserName
              : usersData?.UserName
          }
          about={
            usersData?.from == "Home"
              ? userById?.data?.Data?.About != null
                ? userById?.data?.Data?.About
                : "No Data Found"
              : usersData?.About != null
              ? usersData?.About
              : "No Data Found"
          }
          data={usersData?.from == "Home" ? userById?.data?.Data : usersData}
        />
        <div className="flex flex-wrap justify-center max-w-6xl mx-auto lg:justify-around">
          <div className="flex-grow md:max-w-[290px] hidden lg:block"></div>
          <div className=" md:max-w-[800px]  flex-grow lg:-mt-48">
            <div
              className={`
            ${isOpen === "open" ? "opacity-30" : "opacity-100"}
           p-5 mt-4 mb-9 md:shadow-[0_5px_30px_-13px_rgba(0,0,0,0.3)] md:rounded-lg
           `}
              style={{ marginLeft: "14vh" }}
            >
              <h1 className="text-2xl font-bold text-[#0E134F]">Reviews</h1>
              {userReviews?.data?.Data?.Reviews?.length > 0 ? (
                <div>
                  {userReviews?.data?.Data?.Reviews?.map((item, index) => {
                    return (
                      <div key={index}>
                        <div className="flex items-center py-4 mt-2 ">
                          <div className="relative flex-grow-0 sm:mt-0 mt-0  max-w-[100%] w-[55px] h-[55px]  min-w-[55px]">
                            <Image
                              src={imageBaseUrl + item?.CreatedBy?.Media?.Path}
                              layout="fill"
                              objectfit="contain"
                              className="rounded-full"
                            />
                          </div>
                          <div className="flex items-center flex-grow ml-4 md:ml-6">
                            <div className="flex-grow">
                              <h1 className="font-strongg text-[#0E134F] text[16px]">
                                {item?.CreatedBy?.FullName}
                              </h1>
                              <div className="flex my-[1px]">
                                {item?.Rating == 5 ? (
                                  <>
                                    <StarIcon className="h-5 text-[#E9813B]" />
                                    <StarIcon className="h-5 text-[#E9813B]" />
                                    <StarIcon className="h-5 text-[#E9813B]" />
                                    <StarIcon className="h-5 text-[#E9813B]" />
                                    <StarIcon className="h-5 text-[#E9813B]" />
                                  </>
                                ) : item?.Rating == 4 ? (
                                  <>
                                    <StarIcon className="h-5 text-[#E9813B]" />
                                    <StarIcon className="h-5 text-[#E9813B]" />
                                    <StarIcon className="h-5 text-[#E9813B]" />
                                    <StarIcon className="h-5 text-[#E9813B]" />
                                  </>
                                ) : item?.Rating == 3 ? (
                                  <>
                                    <StarIcon className="h-5 text-[#E9813B]" />
                                    <StarIcon className="h-5 text-[#E9813B]" />
                                    <StarIcon className="h-5 text-[#E9813B]" />
                                  </>
                                ) : item?.Rating == 2 ? (
                                  <>
                                    <StarIcon className="h-5 text-[#E9813B]" />
                                    <StarIcon className="h-5 text-[#E9813B]" />
                                  </>
                                ) : (
                                  <StarIcon className="h-5 text-[#E9813B]" />
                                )}
                              </div>
                              <h1 className="text-sm text-gray-800 font-normall">
                                {item?.Description}
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
              ) : (
                <div>
                  <p style={{ fontSize: "15px", color: "grey" }}>
                    No Data Found
                  </p>
                </div>
              )}
              <div className="mt-4 mb-6 md:hidden"></div>
            </div>
          </div>
          <Notifications />
          <Invite />
          <SendMessage />
        </div>
        <Review />
      </div>
      <Review />
      <ReviewsModal />
    </div>
  );
};

export default Person;
