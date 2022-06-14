import React, { useEffect, useState, useRef } from "react";
import Nav from "./Nav";
// import Image from "next/image";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { HomeActions } from "../store/actions";
import { imageBaseUrl } from "../config/utils";
import Notifications from "./Notifications";
import { Avatar } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import {
  CalendarIcon,
  CameraIcon,
  ChevronLeftIcon,
  CogIcon,
  PaperClipIcon,
  XIcon,
} from "@heroicons/react/outline";
import Moment from "react-moment";
import Loader from "./Loader";
import { useRecoilState } from "recoil";
import { loadingState, reviewModal } from "../atoms/modalAtom";
import moment from "moment";
import { socket } from "../config/utils";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";
import Review from "./Review";
import Head from "next/head";
import { baseUrl } from "../config/utils";
const Messeges = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [user, setUser] = useState({});
  const [chatItem, setChatItem] = useState();
  const [loading, setLoading] = useRecoilState(loadingState);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [chatJoined, setChatJoined] = useState(false);
  const invitatioinChat = useSelector((state) => state?.Home?.Invitation_chat);
  const [openReview, setOpenReview] = useRecoilState(reviewModal);
  const [sendChat, setSendChat] = useState(false);
  const [play, setPlay] = useState(false);
  const [cameraOpen, setCameraOpen] = useState(false);
  const [noPhoto, setNoPhoto] = useState(true);
  const [pic, setPic] = useState();
  const filePickerRef = useRef(null);
  let videoRef = useRef(null);
  let photoRef = useRef(null);
  const invitationMessages = useSelector(
    (state) => state?.Home?.Invitation_messages
  );
  const getUserCamera = () => {
    setCameraOpen(true);
    navigator.mediaDevices
      .getUserMedia({
        video: true,
      })
      .then((stream) => {
        // attach the stream to the video tag
        let video = videoRef.current;

        video.srcObject = stream;
        video.play();
      })
      .catch((err) => {
        // console.error(err);
      });
    setPlay(true);
  };
  const closeCamera = () => {
    let video = videoRef.current;
    video.srcObject.getTracks()[0].stop();
    setCameraOpen(false);
    setNoPhoto(true);
  };
  const takePicture = () => {
    const width = 400;
    const height = width / (16 / 9);

    let video = videoRef.current;

    let photo = photoRef.current;
    photo.width = width;

    photo.height = height;
    let ctx = photo?.getContext("2d");
    // upload(photo?.current.toBlob())
    ctx?.drawImage(video, 0, 0, width, height);
    setNoPhoto(false);
    // photo?.toDataURL("image/png")
    var img = new Image();
    img.src = photo.toDataURL();
    setPic(img.src);
    // debugger;
    // console.log('---------->',photoRef)
    // console.log(img.src);
    // upload(img.src)
  };
  function DataURIToBlob(dataURI) {
    const splitDataURI = dataURI.split(",");
    const byteString =
      splitDataURI[0].indexOf("base64") >= 0
        ? atob(splitDataURI[1])
        : decodeURI(splitDataURI[1]);
    const mimeString = splitDataURI[0].split(":")[1].split(";")[0];

    const ia = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++)
      ia[i] = byteString.charCodeAt(i);

    return new Blob([ia], { type: mimeString });
  }

  const upload = async (image) => {
    const formData = new FormData();
    if (cameraOpen == true) {
      const file = DataURIToBlob(pic);

      formData.append("file", file, "image.jpg");
    } else {
      formData.append("file", image);
    }
    // console.log("--------->",file, typeof pic);
    const jwt = localStorage.getItem("JWTEventBuddy");
    try {
      let fata = await axios.post(`${baseUrl}media/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: jwt,
        },
      });
      // console.log(fata, "api payload");
      if (fata?.data?.Status == 200) {
        {
          cameraOpen == true && closeCamera();
        }
        setCameraOpen(false);
        sendMessage(fata?.data?.Data?.Id);
        setNoPhoto(true);
      } else {
        // console.log(fata?.data, "api payload");
        // toast.error(fata?.data?.Message);
        throw new Error(fata?.data);
      }
    } catch (error) {
      // toast.error(error);
      // console.log(error, "api payload");
    }
  };
  useEffect(() => {
    loadingTrue();
  }, []);
  const loadingTrue = () => {
    setLoading(true);
    UserDetails()
      .then((res) => {
        dispatch(
          HomeActions.userDetails({
            user: res?.user,
            token: res?.token,
          })
        );
      })
      .catch((e) => {});
    dispatch(HomeActions.InvitationMessages());
  };
  const UserDetails = async () => {
    const User = await localStorage.getItem("user");
    const user = JSON.parse(User);
    setUser(user);
    return user;
  };

  if (invitationMessages?.data?.Data?.length >= 0) {
  }
  const getOldChatFromApi = async (id) => {
    setLoading(true);
    const jwt = localStorage.getItem("JWTEventBuddy");
    let data = await axios
      .get(
        `
        ${baseUrl}chat/${id}`,
        {
          headers: {
            authorization: jwt,
          },
        }
      )
      .then((res) => {
        // console.log("--------->chat", res?.data);
        res?.data?.Data?.map((item) => {
          chat.push({
            CreatedById: item?.CreatedById,
            Id: item?.Id,
            Message: item?.Message,
            invitatioinId: item?.InvitationId,
            MediaId: item?.MediaId,
            Media: item?.Media,
            CreatedAt: item?.CreatedAt,
          });
        });
      });
  };
  const getOldChat = (id) => {
    socket.emit("chat_join", {
      ChatId: id,
    });
    getOldChatFromApi(id);
    setChatJoined(true);
  };

  useEffect(() => {
    {
      chatJoined && recievedMessagesfromServer();
    }
  }, [chat, chatJoined]);
  const sendMessage = (id) => {
    setSendChat(true);
    setMessage("Sending....");
    socket.emit(
      "message",
      {
        InvitationId: chatItem?.Id,
        Content: message,
        MediaId: id,
      },
      async (data) => {
        // console.log('Data From Server',data)
        chat.push({
          CreatedById: data?.Chat?.CreatedById,
          Id: data?.Chat.Id,
          Message: data?.Chat.Message,
          invitatioinId: data?.InvitationId,
          MediaId: data?.MediaId,
          Media: data?.Media,
        });
        setMessage("");
        setSendChat(false);
        setPic();
        setNoPhoto(true);
      }
    );

    dispatch(HomeActions.InvitationChat(chatItem?.Id));
  };
  const recievedMessagesfromServer = () => {
    socket.on("message", (data) => {
      // console.log("--------->", data);
      setChat([
        ...chat,
        {
          CreatedById: data?.Chat?.CreatedById,
          Id: data?.Chat.Id,
          Message: data?.Chat.Message,
          MediaId: data?.MediaId,
          Media: data?.Media,
          invitatioinId: data?.InvitationId,
        },
      ]);
    });
  };
  const AlwaysScrollToBottom = () => {
    const elementRef = useRef();
    useEffect(() => elementRef.current.scrollIntoView());
    return <div ref={elementRef} />;
  };
  const fileSelectedHandler = (e) => {
    upload(e.target.files[0]);
  };
  // console.log("--------->chat", chat);
  return (
    <>
      {cameraOpen == false ? (
        <div>
          <Head>
            <title>Event Buddy</title>
            <meta name="description" content="Generated by create next app" />
            <link rel="icon" href="/appicon.png" />
          </Head>
          <Nav active="messeges" />
          <div className="p-2 mx-auto mt-0 max-w-7xl md:mt-5 "></div>
          <div className="flex flex-wrap mx-auto justify-left max-w-7xl ">
            <div
              className="flex-grow md:max-w-[410px] bg-white  hidden md:inline-block "
              style={{
                height: "85vh",
                flex: 0.5,
              }}
            >
              <div
                className="p-5 -mb-1 rounded-md md:mb-5 md:shadow-lg"
                style={{
                  height: "85vh",
                }}
              >
                <h1 className="text-2xl font-strongg text-[#0E134F]">
                  Messeges
                </h1>
                <div>
                  {invitationMessages?.data?.Data?.map((item, index) => {
                    let userId = user?.user?.Id;
                    return (
                      <div
                        key={index}
                        className="flex items-center p-2 py-4 mt-4 bg-white rounded-lg shadow-[0_5px_30px_-13px_rgba(0,0,0,0.3)] cursor-pointer md:-ml-2 md:shadow-none"
                        style={{
                          boxShadow: "3px 3px 15px 3px #DFDFDF",
                        }}
                        onClick={() => {
                          dispatch(HomeActions.InvitationChat(item?.Id));
                          setChatItem(item);
                          // console.log("--------->item", item);
                          getOldChat(item?.Id);
                        }}
                      >
                        <div className="relative flex-grow-0 sm:mt-0 mt-0  max-w-[100%] w-[55px] h-[55px]  min-w-[55px]">
                          <img
                            src={
                              userId == item?.User?.Id
                                ? imageBaseUrl + item?.CreatedBy?.Media?.Path
                                : imageBaseUrl + item?.User?.Media?.Path
                            }
                            // layout="fill"
                            // objectfit="contain"
                            // className="rounded-xl"
                            style={{
                              height: "60px",
                              width: "60px",
                              borderRadius: "10px",
                            }}
                          />
                        </div>
                        <div className="flex items-center flex-grow ml-4 md:ml-4">
                          <div className="flex-grow">
                            <h1 className="font-bold text-[#0E134F]">
                              {userId == item?.User?.Id
                                ? item?.CreatedBy?.FullName
                                : item?.User?.FullName}
                              {/* <h1 className="text-sm text-gray-400 line-clamp-1">
                                {item?.Title}
                              </h1> */}
                            </h1>
                            <h1
                              className="text-sm text-gray-400 line-clamp-1"
                              // style={{
                              //   color:
                              //     item?.Chats[0]?.Seen == false ? "black" : "grey",
                              // }}
                            >
                              {item?.Chats[0]?.Message != ""
                                ? item?.Chats[0]?.Message
                                : "Photo"}
                            </h1>
                          </div>
                          <p className="mb-4 text-sm text-[#E9813B]  min-w-[120px] max-h-10">
                            <Moment fromNow>{item?.Chats[0]?.CreatedAt}</Moment>
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
                className="relative flex-grow hidden bg-white md:inline-block"
                style={{
                  marginLeft: chatItem ? "50px" : "0px",
                  height: "85vh",

                  flex: 1,
                }}
              >
                <div
                  className="flex-grow bg-white "
                  style={{
                    height: "85vh",
                  }}
                >
                  <div
                    className="shadow-lg md:rounded-lg"
                    style={{
                      height: "85vh",
                    }}
                  >
                    <div className="p-5">
                      <h1 className="flex items-center justify-between">
                        <span
                          className="flex-grow-0 float-left cursor-pointer md:hidden"
                          onClick={() => router.push("/messeges")}
                        >
                          <ChevronLeftIcon className="h-6 w-6 sm:w-8 sm:h-8 text-[#E9813B] cursor-pointer" />
                        </span>
                        <span className="pl-2 text-xl md:font-mediumm md:text-[#42526E] font-strongg text-[#0E134F]">
                          {user?.user?.Id == chatItem?.User?.Id
                            ? chatItem?.CreatedBy?.FullName
                            : chatItem?.User?.FullName}
                        </span>
                        <div
                          className="relative w-[28px] mr-1 h-[22px]  text-[#E9813B] cursor-pointer hover:bg-#E9813B-80"
                          onClick={() => {
                            setOpenReview(true);
                          }}
                        >
                          <img
                            src="/hand.png"
                            alt="infoImg"
                            // layout="fill"
                            // objectfit="contain"
                          />
                        </div>
                      </h1>
                    </div>
                    <hr className="w-[100%] mx-auto border-gray-200" />
                    <div className="p-5 ">
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

                      <div className="pt-8 pb-2 scrollbar-hide max-h-[400px] relative overflow-y-scroll ">
                        {chat?.length > 0 ? (
                          <div>
                            {chat?.map((item) => {
                              return (
                                <>
                                  {user?.user?.Id == item?.CreatedById ? (
                                    <div>
                                      {item?.MediaId == null ? (
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
                                            {item?.Message} <br></br>
                                            <span
                                              style={{
                                                fontSize: "8px",
                                              }}
                                            >
                                              {moment(item?.CreatedAt).format(
                                                "HH:mm a"
                                              )}
                                            </span>
                                          </span>
                                        </h1>
                                      ) : (
                                        <div
                                          style={{
                                            // height: "10vh",
                                            // width: "100%",
                                            display: "flex",
                                            alignContent: "center",
                                            alignItems: "center",
                                            justifyContent: "flex-end",
                                            marginTop: "50px",
                                            alignSelf: "end",
                                          }}
                                        >
                                          <span
                                            style={{
                                              fontSize: "8px",
                                              marginLeft: "10px",
                                            }}
                                          >
                                            {moment(item?.CreatedAt).format(
                                              "HH:mm a"
                                            )}
                                          </span>
                                          <br></br>
                                          <img
                                            src={
                                              imageBaseUrl + item?.Media?.Path
                                            }
                                            alt="infoImg"
                                            style={{
                                              marginLeft: "10px",
                                              borderRadius: "10px",
                                            }}
                                          />
                                          <br></br>
                                        </div>
                                      )}
                                    </div>
                                  ) : (
                                    <div>
                                      {item?.MediaId == null ? (
                                        <h1 className="flex mt-[52px] mb-[11px]">
                                          <Avatar
                                            src={
                                              imageBaseUrl +
                                              chatItem?.User?.Media?.Path
                                            }
                                          />
                                          <span className="px-3 pt-2 pb-[10px] text-[14px] ml-2 bg-[#FCEFE6] rounded-tl-none rounded-xl">
                                            {item?.Message} <br></br>
                                            <span
                                              style={{
                                                fontSize: "8px",
                                              }}
                                            >
                                              {moment(item?.CreatedAt).format(
                                                "HH:mm a"
                                              )}
                                            </span>
                                            {/* <Moment fromNow>{item?.CreatedAt}</Moment> */}
                                          </span>
                                        </h1>
                                      ) : (
                                        <div
                                          style={{
                                            // height: "10vh",
                                            // width: "100%",
                                            display: "flex",
                                            alignContent: "center",
                                            alignItems: "center",
                                            marginTop: "50px",
                                          }}
                                        >
                                          <Avatar
                                            src={
                                              imageBaseUrl +
                                              chatItem?.User?.Media?.Path
                                            }
                                          />
                                          {/* <div style={{
                                              marginLeft: "10px",
                                              borderRadius: "10px",
                                              width:"100px",
                                              height:"100px",
                                              backgroundImage:(imageBaseUrl + item?.Media?.Path),
                                              backgroundRepeat: "no-repeat",
                                              backgroundAttachment: "fixed",
                                              backgroundPosition: "bottom right",
                                            }}>

                                          </div> */}
                                          <img
                                            src={
                                              imageBaseUrl + item?.Media?.Path
                                            }
                                            alt="infoImg"
                                            layout="fill"
                                            objectfit="contain"
                                            style={{
                                              marginLeft: "10px",
                                              borderRadius: "10px",
                                            }}
                                          />
                                          <br></br>
                                          <span
                                            style={{
                                              fontSize: "8px",
                                              marginLeft: "10px",
                                            }}
                                          >
                                            {moment(item?.CreatedAt).format(
                                              "HH:mm a"
                                            )}
                                          </span>
                                        </div>
                                      )}
                                    </div>
                                  )}
                                  <AlwaysScrollToBottom />
                                </>
                              );
                            })}
                          </div>
                        ) : (
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            <ClipLoader
                              color="#ED974B"
                              loading={true}
                              size={50}
                            />
                          </div>
                        )}
                        <AlwaysScrollToBottom />
                      </div>
                      <div className="z-[100000] flex justify-between absolute flex-grow md:mb-2 w-[95%] xl:bottom-0 bottom-1">
                        <div className="flex items-center flex-grow px-4 bg-[#F2F2F2] py-2 rounded-md mr-3">
                          <input
                            type="text"
                            placeholder="Type messege"
                            readOnly={sendChat}
                            className="flex-grow text-sm bg-transparent border-none outline-none"
                            value={message}
                            onChange={(e) => {
                              setMessage(e.target.value);
                            }}
                          />
                          {/* <EmojiHappyIcon className="w-5 h-5 mr-2 text-gray-400 cursor-pointer" /> */}
                          <div>
                            <PaperClipIcon
                              className="w-5 h-5 text-gray-400 cursor-pointer"
                              onClick={() => filePickerRef.current.click()}
                            />
                            <input
                              ref={filePickerRef}
                              type="file"
                              className="hidden"
                              onChange={fileSelectedHandler}
                            />
                          </div>
                          <CameraIcon
                            className="w-5 h-5 text-gray-400 cursor-pointer"
                            onClick={getUserCamera}
                          />
                        </div>
                        <div
                          className="float-right  cursor-pointer bg-[#E9813B] flex items-center justify-center p-2 rounded-md "
                          style={{
                            background:
                              message == "Sending...." ? "#f6c8a9" : "#E9813B",
                          }}
                          onClick={() => {
                            if (message != "") {
                              sendMessage();
                            }
                          }}
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
          <Review eventDetails={chatItem} />
        </div>
      ) : (
        <div className="">
          <Head>
            <title>Event Buddy</title>
            <meta name="description" content="Generated by create next app" />
            <link rel="icon" href="/appicon.png" />
          </Head>
          <div className="bg-black h-[100vh] sm:h-[92vh]">
            <div
              style={{
                display: "flex",
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <video
                ref={videoRef}
                // className=" w-full  md:h-[92vh] h-[80vh]"
                style={{
                  flex: 1,
                  // width :'100%',
                  //  height: '100%'
                }}
              ></video>
              <div
                style={{
                  flex: 1,
                  height: "100%",
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    opacity: noPhoto == true ? 1 : 0,
                    background: "#000",
                    position: "absolute",
                    top: 0,
                    right: 0,
                    left: 0,
                    bottom: 0,
                    zIndex: 0,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <p
                    style={{
                      color: "white",
                      width: "100%",
                      marginRight: "-73%",
                    }}
                  >
                    Image Preview (Please Capture Image)
                  </p>
                </div>
                <canvas
                  ref={photoRef}
                  // className="w-full  md:h-[92vh] h-[80vh]"
                  style={{ width: "100%", height: "71.5%" }}
                ></canvas>
              </div>
            </div>
            <div className="flex items-center justify-between w-full pt-10 overflow-hidden sm:hidden">
              <XIcon
                onClick={() => setPlay(false)}
                className="flex-grow w-6 h-6 text-gray-200 mr-28"
              />
              <CogIcon className="flex-grow w-6 h-6 text-gray-200 ml-28" />
            </div>
          </div>
          <div className="bg-gray-300 h-[8vh] sm:flex items-center justify-around hidden ">
            {noPhoto == true ? (
              <div
                onClick={takePicture}
                className="p-3 bg-red-600 border rounded-full cursor-pointer"
              >
                <CameraIcon className="w-6 h-6 text-white" />
              </div>
            ) : (
              <>
                {" "}
                <div
                  onClick={() => setNoPhoto(true)} //router.reload()}
                  className="p-3 bg-red-600 border rounded-full cursor-pointer"
                >
                  <XIcon className="flex-grow w-6 h-6 text-gray-200" />
                </div>{" "}
                <div
                  onClick={upload}
                  className="p-3 bg-red-600 border rounded-full cursor-pointer"
                >
                  <span style={{ color: "white" }}>Send</span>
                </div>
              </>
            )}
          </div>
          <button
            onClick={closeCamera}
            className="fixed px-4 py-2 font-semibold uppercase bg-gray-200 rounded-lg lg:left-12 lg:bottom-3 hover:bg-gray-300 left-2 bottom-1"
          >
            Back
          </button>
        </div>
      )}
    </>
  );
};

export default Messeges;
