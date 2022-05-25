import React, { useEffect, useState } from "react";
import Nav from "./Nav";
import Image from "next/image";
import { useRouter } from "next/router";
import Chat from "./Chat";
import { useDispatch, useSelector } from "react-redux";
import { HomeActions } from "../store/actions";
import IO from "socket.io-client";
import { imageBaseUrl, SOCKET_URL } from "../config/utils";
import Notifications from "./Notifications";
import { Avatar } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import {
  CalendarIcon,
  CameraIcon,
  ChevronLeftIcon,
  EmojiHappyIcon,
} from "@heroicons/react/outline";
import Moment from "react-moment";
import Loader from "./Loader";
import { useRecoilState } from "recoil";
import { loadingState } from "../atoms/modalAtom";
import moment from "moment";
import { socket, setSocketRef } from "../config/utils";
const Messeges = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [user, setUser] = useState({});
  const [chatItem, setChatItem] = useState();
  const userDetails = useSelector((state) => state?.Home?.userDetail);
  const [loading, setLoading] = useRecoilState(loadingState);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  // let socket;
  // const user = localStorage.getItem("user");
  const [invitationMessagesSuccess, setInvitationMessagesSuccess] = useState(
    []
  );

  const invitationMessages = useSelector(
    (state) => state?.Home?.Invitation_messages
  );

  const invitatioinChat = useSelector((state) => state?.Home?.Invitation_chat);
  // console.log(
  //   "invitationMessages------------>",
  //   invitationMessages?.data?.Data?.length
  // );
  // console.log("=======>User Not Login", invitatioinChat);
  useEffect(() => {
    setLoading(true);
    UserDetails()
      .then((res) => {
        dispatch(
          HomeActions.userDetails({
            user: res?.user,
            token: res?.token,
          })
        );

        // console.log("=======>User Not Login", invitationMessages);
        // socketConnection({ id: res?.user?.Id, token: res?.token });
      })
      .catch((e) => {
        // console.log("=======>User Not Login", e);
      });
    dispatch(HomeActions.InvitationMessages());
  }, []);

  const UserDetails = async () => {
    const User = await localStorage.getItem("user");
    const user = JSON.parse(User);
    setUser(user);
    return user;
  };

  if (invitationMessages?.data?.Data?.length >= 0) {
    setLoading(false);
  }

  const getOldChat = (id) => {
    dispatch(HomeActions.InvitationChat(id));
    socket.emit("chat_join", {
      ChatId: id,
    });
    let array = [];
    invitatioinChat?.data?.Data?.map((item) => {
      chat.push({
        CreatedById: item?.CreatedById,
        Id: item?.Id,
        Message: item?.Message,
      });
    });
    recievedMessagesfromServer();
    // setChat(array);
    // console.log("00000000000", array);
  };

  const sendMessage = () => {
    // console.log("-------->>>>>><<<<>>>", message);
    setMessage("");
    socket.emit(
      "message",
      {
        InvitationId: chatItem?.Id,
        Content: message,
      },
      async (data) => {
        console.log("data", data);
        chat.push({
          CreatedById: data?.Chat?.CreatedById,
          Id: data?.Chat.Id,
          Message: data?.Chat.Message,
        });
      }
    );

    dispatch(HomeActions.InvitationChat(chatItem?.Id));
  };
  const recievedMessagesfromServer = () => {
    socket.on("message", (data) => {
      // const packet = JSON.parse(data);
      console.log("----------->", data.Chat);
      chat.push({
        CreatedById: data?.Chat?.CreatedById,
        Id: data?.Chat.Id,
        Message: data?.Chat.Message,
      });
    });
  };
  return (
    <div>
      <Nav active="messeges" />
      <div className="p-2 mx-auto mt-0 max-w-7xl md:mt-5 "></div>
      <div className="flex flex-wrap mx-auto justify-left max-w-7xl ">
        <div className="flex-grow md:max-w-[410px] bg-white  hidden md:inline-block">
          <div className="p-5 -mb-1 rounded-md md:mb-5 md:shadow-lg">
            <h1 className="text-2xl font-strongg text-[#0E134F]">Messeges</h1>
            <div>
              {invitationMessages?.data?.Data?.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="flex items-center p-2 py-4 mt-4 bg-white rounded-lg shadow-[0_5px_30px_-13px_rgba(0,0,0,0.3)] cursor-pointer md:-ml-2 md:shadow-none"
                    // style={{ border: "2px solid red" }}
                    onClick={() => {
                      setChatItem(item);
                      getOldChat(item?.Id);
                      console.log("Item", item);
                    }}
                  >
                    <div className="relative flex-grow-0 sm:mt-0 mt-0  max-w-[100%] w-[55px] h-[55px]  min-w-[55px]">
                      <Image
                        src={imageBaseUrl + item?.User?.Media?.Path}
                        layout="fill"
                        objectfit="contain"
                        className="rounded-xl"
                      />
                    </div>
                    <div className="flex items-center flex-grow ml-4 md:ml-4">
                      <div className="flex-grow">
                        <h1 className="font-bold text-[#0E134F]">
                          {item?.User?.FullName}
                        </h1>
                        <h1 className="text-sm text-gray-400 line-clamp-1">
                          {item?.Description}
                        </h1>
                      </div>
                      <p className="mb-4 text-sm text-[#E9813B]  min-w-[120px] max-h-10">
                        <Moment fromNow>{item?.CreatedAt}</Moment>
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* These messeges only appear in mobile  */}

        <div className="flex-grow md:max-w-[410px] bg-white md:hidden ">
          <div className="p-5 -mb-1 rounded-md md:mb-5 md:shadow-lg">
            <h1 className="text-2xl font-bold text-[#0E134F]">Messeges</h1>
            <div>
              {invitationMessages?.data?.Data?.map((item, index) => {
                return (
                  <div
                    key={index}
                    onClick={() => router.push("/chat")}
                    className="flex items-center p-2 py-4 mt-4 bg-white rounded-lg shadow-[0_5px_30px_-15px_rgba(0,0,0,0.3)] cursor-pointer md:-ml-2 md:shadow-none"
                  >
                    <div className="relative flex-grow-0 sm:mt-0 mt-0  max-w-[100%] w-[55px] h-[55px]  min-w-[55px]">
                      <Image
                        src={imageBaseUrl + item?.User?.Media?.Path}
                        layout="fill"
                        objectfit="contain"
                        className="rounded-xl"
                      />
                    </div>
                    <div className="flex items-center flex-grow ml-4 md:ml-4">
                      <div className="flex-grow">
                        <h1 className="font-bold text-[#0E134F]">
                          {item?.User?.FullName}
                        </h1>
                        <h1 className="text-sm text-gray-400 line-clamp-1">
                          {item?.Description}
                        </h1>
                      </div>
                      <p className="mb-4 text-sm text-[#E9813B]  min-w-[50px]">
                        {item?.CreatedAt}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {chatItem && (
          <div
            className="md:max-w-[700px]  flex-grow  bg-white hidden md:inline-block"
            style={{ marginLeft: chatItem ? "150px" : "0px" }}
          >
            <div className="md:max-w-[700px]  flex-grow  bg-white ">
              <div className="shadow-lg md:rounded-lg">
                <div className="p-5">
                  <h1 className="flex items-center justify-between">
                    <span
                      className="flex-grow-0 float-left cursor-pointer md:hidden"
                      onClick={() => router.push("/messeges")}
                    >
                      <ChevronLeftIcon className="h-6 w-6 sm:w-8 sm:h-8 text-[#E9813B] cursor-pointer" />
                    </span>
                    <span className="pl-2 text-xl md:font-mediumm md:text-[#42526E] font-strongg text-[#0E134F]">
                      {chatItem?.User?.FullName}
                    </span>
                    <div className="relative w-[34px] mr-1 h-[22px]  text-[#E9813B] ">
                      <Image
                        src="/hand.png"
                        alt="infoImg"
                        layout="fill"
                        objectfit="contain"
                      />
                    </div>
                  </h1>
                </div>
                <hr className="w-[100%] mx-auto border-gray-200" />
                <div className="p-5">
                  <div className="border-[#E77334] border p-3 rounded-lg bg-white shadow-md">
                    <p className="flex items-center ">
                      <CalendarIcon className="w-4 h-4 text-[#ED974B]" />
                      <span className="ml-2 text-sm text-gray-400">
                        {moment(chatItem?.CreatedAt).format("LL")}
                      </span>
                    </p>
                    <h4 className="font-bold text-[#0E134F] my-1">
                      {chatItem?.Title}
                    </h4>
                    <p className="text-sm text-gray-400  line-clamp-2 max-w-[330px]">
                      {chatItem?.Description}
                    </p>
                  </div>

                  <div className="pt-8 pb-4 scrollbar-hide max-h-[350px] overflow-y-scroll ">
                    {chat?.map((item) => {
                      return (
                        <>
                          {user?.user?.Id == item?.CreatedById ? (
                            <h1
                              className="flex mt-[52px] mb-[11px]"
                              style={{
                                display: "flex",
                                flexDirection: "column",
                              }}
                            >
                              <span
                                className="  px-3 pt-2 pb-[10px] text-[14px] ml-2 bg-gray-100 rounded-tl-none rounded-xl"
                                style={{ alignSelf: "flex-end" }}
                              >
                                {item?.Message}
                              </span>
                            </h1>
                          ) : (
                            <h1 className="flex mt-[52px] mb-[11px]">
                              <Avatar src="/man1.png" />
                              <span className="px-3 pt-2 pb-[10px] text-[14px] ml-2 bg-[#FCEFE6] rounded-tl-none rounded-xl">
                                {item?.Message}
                              </span>
                            </h1>
                          )}
                        </>
                      );
                    })}
                  </div>
                  <div className="flex justify-between mb-6 md:mb-1">
                    <div className="flex items-center flex-grow px-4 bg-[#F2F2F2] py-2 rounded-md mr-3">
                      <input
                        type="text"
                        placeholder="Type messege"
                        className="flex-grow text-sm bg-transparent border-none outline-none"
                        value={message}
                        onChange={(e) => {
                          setMessage(e.target.value);
                        }}
                      />
                      {/* <EmojiHappyIcon className="w-5 h-5 mr-2 text-gray-400 cursor-pointer" /> */}
                      <CameraIcon className="w-5 h-5 text-gray-400 cursor-pointer" />
                    </div>
                    <div
                      className="float-right  cursor-pointer bg-[#E9813B] flex items-center justify-center p-2 rounded-md"
                      onClick={() => sendMessage()}
                    >
                      <SendIcon className="w-5 h-5 text-white -rotate-45" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Notifications />
      <Loader />
    </div>
  );
};

export default Messeges;
