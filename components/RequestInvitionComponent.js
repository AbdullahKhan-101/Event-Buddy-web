import React, { useEffect, useState } from "react";
import { UserIcon } from "@heroicons/react/solid";
import {
  ChevronLeftIcon,
  UploadIcon,
  UserAddIcon,
} from "@heroicons/react/outline";
import { useRouter } from "next/router";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { HomeActions } from "../store/actions";
import { imageBaseUrl } from "../config/utils";

const RequestInvitionComponent = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [active, setActive] = useState("sent");
  const [state, setState] = useState("accept");

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
  console.log("checking get pending invitations ==> ", pendingInvitations);
  const sentInvitatioins = useSelector((state) => state?.Home?.SentInvitations);

  const receivedInvitatioins = useSelector(
    (state) => state?.Home?.ReceivedInvitations
  );

  const invitationById = useSelector((state) => state?.Home?.InvitationById);

  const GetPendingInvitations = () => {
    setState("pending");
    setActive("close");
    // setSignupSuccess(SignupResponse);
    dispatch(HomeActions.PendingInvitatioins());
    // console.log(
    //   "checking get pending invitations ==> ",
    //   pendingInvitations?.data?.Data
    // );
  };

  useEffect(() => {
    SentInvitations();
    // accepted();
  }, []);

  const SentInvitations = () => {
    setActive("sent");
    setState("close");
    dispatch(HomeActions.SentInvitatioins());
    // console.log(
    //   "checking sent invitations in request component",
    //   sentInvitatioins
    // );
  };

  const ReceivedInvitations = () => {
    // console.log(
    //   "checking received invitations in requst component",
    //   receivedInvitatioins
    // );
    setActive("receive");
    setState("receive");
    dispatch(HomeActions.ReceivedInvitatioins());
  };

  const InvitationByIdCalling = () => {
    // console.log(invitationById);
    dispatch(HomeActions.InvitationById());
  };

  const accepted = () => {
    setState("accept");
    setActive("close");
  };
  const rejected = () => {
    setState("rejected");
    setActive("close");
  };

  const dummyAcceptInvitationData = [
    {
      img: "/man1.png",
      name: "Hameer Zaleem",
      topic: "Birthaday Celebration",
    },
    {
      img: "/man1.png",
      name: "Hameer Zaleem",
      topic: "Birthaday Celebration",
    },
    {
      img: "/man1.png",
      name: "Hameer Zaleem",
      topic: "Birthaday Celebration",
    },
  ];

  const pendingInvitationsData = pendingInvitations.data?.Data;

  const dummyPendingInvitationData = [
    {
      img: "/man1.png",
      name: "Hameer Zaleem",
      topic: "Event Organization",
    },
    {
      img: "/man1.png",
      name: "Hameer Zaleem",
      topic: "Event Organization",
    },
  ];
  const dummyRejectedInvitationData = [
    {
      img: "/man1.png",
      name: "Hameer Zaleem",
      topic: "Event Rejected",
    },
  ];

  const setntInvitationsData = sentInvitatioins.data?.Data;
  const dummySentInvitationData = [
    {
      img: "/man1.png",
      name: "David Warner",
      topic: "Cricket Match",
    },
  ];

  const receivedInvitatioinsData = receivedInvitatioins?.data?.Data;
  const dummyReceiveInvitationData = [
    {
      img: "/man1.png",
      name: "Dave Parker",
      topic: "Event Received",
    },
    {
      img: "/man1.png",
      name: "Dave Parker",
      topic: "Event Received",
    },
  ];
  return (
    <div>
      <div className="md:max-w-[700px]  flex-grow  bg-white ">
        {/* chat here */}
        {/* <ProfileSettings /> */}
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
                ${state === "accept" ? "bg-[#E9813B]" : " "}
                ${state === "accept" ? "text-white" : "text-[#42526E]"}
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
                {state === "accept" &&
                  dummyAcceptInvitationData.map((item, index) => {
                    return (
                      // {item.status === "accept" && (

                      // )}
                      <div
                        key={index}
                        onClick={InvitationByIdCalling}
                        className="flex items-center  p-2 py-4 mt-2 flex-grow bg-white rounded-lg shadow-[0px_4px_40px_-20px_rgba(0,0,0,0.3)] cursor-pointer md:-ml-2  md:max-w-[300px] max-w-[390px] sm:min-w-[300px] m-2"
                      >
                        <div className="relative flex-grow-0 sm:mt-0 mt-0  max-w-[100%] w-[55px] h-[55px]  min-w-[55px]">
                          <Image
                            src={item.img}
                            layout="fill"
                            objectfit="contain"
                            className="rounded-xl"
                          />
                        </div>
                        <div className="flex items-center flex-grow ml-4 md:ml-4">
                          <div className="flex-grow">
                            <p className="mb-1 text-sm text-[#E9813B]  min-w-[50px]">
                              {item.name}
                            </p>
                            <h1 className=" text-[#0E134F] font-semibold line-clamp-1  min-w-[140px]">
                              {item.topic}
                            </h1>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                {state === "pending" &&
                  pendingInvitationsData?.map((item, index) => {
                    return (
                      <div
                        key={index}
                        onClick={InvitationByIdCalling}
                        className="flex items-center  p-2 py-4 mt-2 flex-grow bg-white rounded-lg shadow-[0px_4px_40px_-20px_rgba(0,0,0,0.3)] cursor-pointer md:-ml-2  md:max-w-[300px] max-w-[390px] sm:min-w-[300px] m-2"
                      >
                        <div className="relative flex-grow-0 sm:mt-0 mt-0  max-w-[100%] w-[55px] h-[55px]  min-w-[55px]">
                          <Image
                            src={imageBaseUrl + item?.CreatedBy?.Media?.Path}
                            // src="/gora1.png"
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
                  dummyRejectedInvitationData.map((item, index) => {
                    return (
                      <div
                        key={index}
                        onClick={InvitationByIdCalling}
                        className="flex items-center  p-2 py-4 mt-2 flex-grow bg-white rounded-lg shadow-[0px_4px_40px_-20px_rgba(0,0,0,0.3)] cursor-pointer md:-ml-2  md:max-w-[300px] max-w-[390px] sm:min-w-[300px] m-2"
                      >
                        <div className="relative flex-grow-0 sm:mt-0 mt-0  max-w-[100%] w-[55px] h-[55px]  min-w-[55px]">
                          <Image
                            src={item.img}
                            layout="fill"
                            objectfit="contain"
                            className="rounded-xl"
                          />
                        </div>
                        <div className="flex items-center flex-grow ml-4 md:ml-4">
                          <div className="flex-grow">
                            <p className="mb-1 text-sm text-[#E9813B]  min-w-[50px]">
                              {item.name}
                            </p>
                            <h1 className=" text-[#0E134F] font-semibold line-clamp-1  min-w-[140px]">
                              {item.topic}
                            </h1>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                {active === "receive" &&
                  receivedInvitatioinsData?.map((item, index) => {
                    return (
                      <div
                        key={index}
                        onClick={InvitationByIdCalling}
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
                {active === "sent" &&
                  setntInvitationsData?.map((item, index) => {
                    return (
                      <div
                        key={index}
                        onClick={InvitationByIdCalling}
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestInvitionComponent;
