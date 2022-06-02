import React, { useEffect, useState } from "react";
import { ChevronLeftIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { HomeActions } from "../store/actions";
import { imageBaseUrl } from "../config/utils";
import { acceptInviteModal, ClickNotificationData } from "../atoms/modalAtom";
import { useRecoilState } from "recoil";

const RequestInvitionComponent = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [active, setActive] = useState("sent");
  const [state, setState] = useState("accepted");
  const [isOpen, setIsOpen] = useRecoilState(acceptInviteModal);
  const [clickNotificationData, setClickNotificationData] = useRecoilState(
    ClickNotificationData
  );
  const [pendingInvitationsSuccess, setPendingInvitationsSuccess] = useState(
    []
  );
  const [sentInvitatioinsSuccess, setSentInvitatioinsSuccess] = useState([]);
  const [receivedInvitatioinsSuccess, setReceivedInvitatioinsSuccess] =
    useState([]);
  const [invitationByIdSuccess, setInvitationByIdSuccess] = useState([]);

  const pendingInvitations = useSelector(
    (state) => state?.Home?.PendingInvitations
  );
  const sentInvitatioins = useSelector((state) => state?.Home?.SentInvitations);

  const receivedInvitatioins = useSelector(
    (state) => state?.Home?.ReceivedInvitations
  );

  const invitationById = useSelector((state) => state?.Home?.InvitationById);

  const GetPendingInvitations = () => {
    setState("pending");
    dispatch(HomeActions.PendingInvitatioins());
  };

  useEffect(() => {
    SentInvitations();
    setActive("sent");
    accepted();
  }, []);

  const SentInvitations = () => {
    setActive("sent");
    setState("accepted");
    dispatch(HomeActions.SentInvitatioins());
  };

  const ReceivedInvitations = () => {
    setActive("receive");
    setState("accepted");
    dispatch(HomeActions.ReceivedInvitatioins());
  };

  const accepted = () => {
    setState("accepted");
  };
  const rejected = () => {
    setState("rejected");
  };

  const setntInvitationsData = sentInvitatioins.data?.Data;

  const receivedInvitatioinsData = receivedInvitatioins?.data?.Data;

  return (
    <div>
      <div className="md:max-w-[700px]  flex-grow  bg-white ">
        <div className="md:shadow-lg md:rounded-lg">
          <div className="relative flex p-5">
            <h1 className="text-[#0E134F]  text-xl text-center sm:px-2 px-1 font-strongg flex items-center flex-grow">
              <span
                className="flex-grow-0 float-left cursor-pointer md:hidden"
                onClick={() => router.push("/settings")}
              >
                <ChevronLeftIcon className="h-6 w-6 sm:w-8 sm:h-8 text-[#E9813B]" />
              </span>
              <span className="flex-grow md:flex-grow-0">Invitations</span>
            </h1>
            <div className="absolute bottom-0 hidden right-8 md:ml-auto md:flex">
              <p
                onClick={SentInvitations}
                className={`
                ${active === "sent" ? "text-[#E9813B]" : "text-gray-400"}
                ${active === "sent" ? "border-[#E9813B]" : ""}
                ${active === "sent" ? "border-b-2" : "border-b"}  
                pb-3 font-semibold  mr-6 cursor-pointer `}
              >
                {" "}
                Sent Invitations{" "}
              </p>
              <p
                onClick={ReceivedInvitations}
                className={`pb-3 font-semibold 
                ${active === "receive" ? "text-[#E9813B]" : "text-gray-400"}
                ${active === "receive" ? "border-[#E9813B]" : ""}
                ${active === "receive" ? "border-b-2" : "border-b"}  
                 cursor-pointer `}
              >
                {" "}
                Received Invitations
              </p>
            </div>
          </div>
          <hr className="w-[100%] mx-auto border-gray-200 " />
          <div className="pb-10 mb-0">
            <div className="flex items-center justify-center p-2 bg-white shadow-md md:hidden">
              <p
                onClick={SentInvitations}
                className={`
                     ${active === "sent" ? "text-[#E9813B]" : "text-gray-400"}
                sm:px-7 px-4 text-[14px] cursor-pointer  border-r`}
              >
                {" "}
                Sent Invitations{" "}
              </p>
              <p
                onClick={ReceivedInvitations}
                className={`sm:px-7 px-4 text-[14px] cursor-pointer
                ${active === "receive" ? "text-[#E9813B]" : "text-gray-400"}`}
              >
                {" "}
                Received Invitations
              </p>
            </div>
            <div className="flex justify-between p-1  sm:max-w-[320px] max-w-[300px] mx-auto mt-8 mb-2 bg-gray-100 rounded-lg">
              <p
                onClick={accepted}
                className={`
                ${state === "accepted" ? "bg-[#E9813B]" : " "}
                ${state === "accepted" ? "text-white" : "text-[#42526E]"}
                px-4 py-1  rounded-lg cursor-pointer  `}
              >
                Accepted
              </p>
              <p
                onClick={GetPendingInvitations}
                className={`px-4 py-1 rounded-lg cursor-pointer 
                ${state === "pending" ? "bg-[#E9813B]" : " "}
                ${state === "pending" ? "text-white" : "text-[#42526E]"}
                `}
              >
                Pending
              </p>
              <p
                onClick={rejected}
                className={`px-4 py-1 rounded-lg cursor-pointer
                                ${state === "rejected" ? "bg-[#E9813B]" : " "}
                ${state === "rejected" ? "text-white" : "text-[#42526E]"}
                `}
              >
                Rejected
              </p>
            </div>
            <div className="p-1 sm:p-5 ">
              <div className="flex flex-wrap items-center justify-around m-2 md:justify-between">
                {/* ----------- / ------------- */}
                {active === "sent" &&
                  state === "accepted" &&
                  setntInvitationsData
                    ?.filter((item) => {
                      return item.Status === "accepted";
                    })
                    .map((item, index) => {
                      return (
                        <div
                          key={index}
                          className="flex items-center  p-2 py-4 mt-2 flex-grow bg-white rounded-lg shadow-[0px_4px_40px_-20px_rgba(0,0,0,0.3)] cursor-pointer md:-ml-2  md:max-w-[300px] max-w-[390px] sm:min-w-[300px] m-2"
                        >
                          <div className="relative flex-grow-0 sm:mt-0 mt-0  max-w-[100%] w-[55px] h-[55px]  min-w-[55px]">
                            <Image
                              src={imageBaseUrl + item?.CreatedBy?.Media?.Path}
                              layout="fill"
                              objectfit="contain"
                              className="rounded-xl"
                            />
                          </div>
                          <div className="flex items-center flex-grow ml-4 md:ml-4">
                            <div className="flex-grow">
                              <p className="mb-1 text-sm text-[#E9813B]  min-w-[50px]">
                                {item?.User?.FullName}
                              </p>
                              <h1 className=" text-[#0E134F] font-semibold line-clamp-1  min-w-[140px]">
                                {item?.Title}
                              </h1>
                            </div>
                          </div>
                        </div>
                      );
                    })}

                {active === "sent" &&
                  state === "pending" &&
                  setntInvitationsData
                    ?.filter((item) => {
                      return item.Status === "pending";
                    })
                    .map((item, index) => {
                      return (
                        <div
                          key={index}
                          //onClick=\{InvitationByIdCalling\}
                          className="flex items-center  p-2 py-4 mt-2 flex-grow bg-white rounded-lg shadow-[0px_4px_40px_-20px_rgba(0,0,0,0.3)] cursor-pointer md:-ml-2  md:max-w-[300px] max-w-[390px] sm:min-w-[300px] m-2"
                        >
                          <div className="relative flex-grow-0 sm:mt-0 mt-0  max-w-[100%] w-[55px] h-[55px]  min-w-[55px]">
                            <Image
                              src={imageBaseUrl + item?.CreatedBy?.Media?.Path}
                              layout="fill"
                              objectfit="contain"
                              className="rounded-xl"
                            />
                          </div>
                          <div className="flex items-center flex-grow ml-4 md:ml-4">
                            <div className="flex-grow">
                              <p className="mb-1 text-sm text-[#E9813B]  min-w-[50px]">
                                {item?.User?.FullName}
                              </p>
                              <h1 className=" text-[#0E134F] font-semibold line-clamp-1  min-w-[140px]">
                                {item?.Title}
                              </h1>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                {active === "sent" &&
                  state === "rejected" &&
                  setntInvitationsData
                    ?.filter((item) => {
                      return item.Status === "rejected";
                    })
                    .map((item, index) => {
                      return (
                        <div
                          key={index}
                          onClick={() => setIsOpen("open")}
                          className="flex items-center  p-2 py-4 mt-2 flex-grow bg-white rounded-lg shadow-[0px_4px_40px_-20px_rgba(0,0,0,0.3)] cursor-pointer md:-ml-2  md:max-w-[300px] max-w-[390px] sm:min-w-[300px] m-2"
                        >
                          <div className="relative flex-grow-0 sm:mt-0 mt-0  max-w-[100%] w-[55px] h-[55px]  min-w-[55px]">
                            <Image
                              src={imageBaseUrl + item?.CreatedBy?.Media?.Path}
                              layout="fill"
                              objectfit="contain"
                              className="rounded-xl"
                            />
                          </div>
                          <div className="flex items-center flex-grow ml-4 md:ml-4">
                            <div className="flex-grow">
                              <p className="mb-1 text-sm text-[#E9813B]  min-w-[50px]">
                                {item?.User?.FullName}
                              </p>
                              <h1 className=" text-[#0E134F] font-semibold line-clamp-1  min-w-[140px]">
                                {item?.Title}
                              </h1>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                {/* ----------- / ------------- */}
                {state === "accepted" &&
                  active === "receive" &&
                  receivedInvitatioinsData
                    ?.filter((item) => {
                      return item.Status === "accepted";
                    })
                    .map((item, index) => {
                      return (
                        <div
                          key={index}
                          onClick={() => {
                            setIsOpen("open");
                            setClickNotificationData(item);
                          }}
                          className="flex items-center  p-2 py-4 mt-2 flex-grow bg-white rounded-lg shadow-[0px_4px_40px_-20px_rgba(0,0,0,0.3)] cursor-pointer md:-ml-2  md:max-w-[300px] max-w-[390px] sm:min-w-[300px] m-2"
                        >
                          <div className="relative flex-grow-0 sm:mt-0 mt-0  max-w-[100%] w-[55px] h-[55px]  min-w-[55px]">
                            <Image
                              src={imageBaseUrl + item?.CreatedBy?.Media?.Path}
                              layout="fill"
                              objectfit="contain"
                              className="rounded-xl"
                            />
                          </div>
                          <div className="flex items-center flex-grow ml-4 md:ml-4">
                            <div className="flex-grow">
                              <p className="mb-1 text-sm text-[#E9813B]  min-w-[50px]">
                                {item?.CreatedBy?.FullName}
                              </p>
                              <h1 className=" text-[#0E134F] font-semibold line-clamp-1  min-w-[140px]">
                                {item?.Title}
                              </h1>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                {state === "pending" &&
                  active === "receive" &&
                  receivedInvitatioinsData
                    ?.filter((item) => {
                      return item.Status === "pending";
                    })
                    .map((item, index) => {
                      return (
                        <div
                          key={index}
                          onClick={() => {
                            setIsOpen("open");
                            setClickNotificationData(item);
                          }}
                          className="flex items-center  p-2 py-4 mt-2 flex-grow bg-white rounded-lg shadow-[0px_4px_40px_-20px_rgba(0,0,0,0.3)] cursor-pointer md:-ml-2  md:max-w-[300px] max-w-[390px] sm:min-w-[300px] m-2"
                        >
                          <div className="relative flex-grow-0 sm:mt-0 mt-0  max-w-[100%] w-[55px] h-[55px]  min-w-[55px]">
                            <Image
                              src={imageBaseUrl + item?.CreatedBy?.Media?.Path}
                              layout="fill"
                              objectfit="contain"
                              className="rounded-xl"
                            />
                          </div>
                          <div className="flex items-center flex-grow ml-4 md:ml-4">
                            <div className="flex-grow">
                              <p className="mb-1 text-sm text-[#E9813B]  min-w-[50px]">
                                {item?.CreatedBy?.FullName}
                              </p>
                              <h1 className=" text-[#0E134F] font-semibold line-clamp-1  min-w-[140px]">
                                {item?.Title}
                              </h1>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                {state === "rejected" &&
                  active === "receive" &&
                  receivedInvitatioinsData
                    ?.filter((item) => {
                      return item.Status === "rejected";
                    })
                    .map((item, index) => {
                      return (
                        <div
                          key={index}
                          onClick={() => {
                            setIsOpen("open");
                            setClickNotificationData(item);
                          }}
                          className="flex items-center  p-2 py-4 mt-2 flex-grow bg-white rounded-lg shadow-[0px_4px_40px_-20px_rgba(0,0,0,0.3)] cursor-pointer md:-ml-2  md:max-w-[300px] max-w-[390px] sm:min-w-[300px] m-2"
                        >
                          <div className="relative flex-grow-0 sm:mt-0 mt-0  max-w-[100%] w-[55px] h-[55px]  min-w-[55px]">
                            <Image
                              src={imageBaseUrl + item?.CreatedBy?.Media?.Path}
                              layout="fill"
                              objectfit="contain"
                              className="rounded-xl"
                            />
                          </div>
                          <div className="flex items-center flex-grow ml-4 md:ml-4">
                            <div className="flex-grow">
                              <p className="mb-1 text-sm text-[#E9813B]  min-w-[50px]">
                                {item?.CreatedBy?.FullName}
                              </p>
                              <h1 className=" text-[#0E134F] font-semibold line-clamp-1  min-w-[140px]">
                                {item?.Title}
                              </h1>
                            </div>
                          </div>
                        </div>
                      );
                    })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestInvitionComponent;
