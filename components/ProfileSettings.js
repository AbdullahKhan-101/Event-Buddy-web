import React, { useEffect, useRef, useState } from "react";
import { UserIcon, XIcon } from "@heroicons/react/solid";
import {
  ChevronLeftIcon,
  UploadIcon,
  UserAddIcon,
} from "@heroicons/react/outline";
import { useRouter } from "next/router";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { HomeActions } from "../store/actions";
import { useDispatch, useSelector } from "react-redux";
import { imageBaseUrl } from "../config/utils";
import { useRecoilState } from "recoil";
import { loadingState } from "../atoms/modalAtom";
import Loader from "./Loader";
import axios from "axios";
import qs from "qs";
import QueryString from "query-string";
const ProfileSettings = () => {
  // const queryString = require("query-string");
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [description, setDescription] = useState("");
  const [selectedImage, setSelectedImage] = useState();
  const filePickerRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const dispatch = useDispatch();
  const router = useRouter();
  const [loading, setLoading] = useRecoilState(loadingState);

  const fileSelectedHandler = (e) => {
    setSelectedImage(e.target.files[0]);
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result);
    };
  };

  const userProfile = useSelector((state) => state?.Home?.UserProfile);
  const userProfileData = userProfile?.data?.Data?.User;

  // console.log("user profile checking data Name ==> ", userProfileData.FullName);

  // userProfileData.map((item, index) => {
  //   setUserProfileDatas(item);
  // });

  useEffect(() => {
    dispatch(HomeActions.UserProfile());
  }, []);

  // console.log(userProfile);
  const onSave = async (image) => {
    setLoading(true);
    // console.log("===========>", image);
    const JWT = localStorage.getItem("JWT");
    if (selectedImage) {
      const formData = new FormData();
      formData.append("file", selectedImage);
      try {
        let fata = await axios.post(
          "http://54.144.168.52:3000/media/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              authorization: JWT,
            },
          }
        );
        console.log(fata, "api payload");
        if (fata?.data.Status == 200) {
          updateProfile(fata?.data?.Data?.Id);
        } else {
          throw new Error(fata?.data);
        }
      } catch (error) {
        toast.error(error);
        console.log(error, "api payload");
      }
    } else {
      updateProfile();
    }
  };
  const updateProfile = async (data) => {
    console.log(data, "data ");
    const JWT = localStorage.getItem("JWT");
    const formData = new FormData();
    if (data) {
      // formData.append("MediaId", data);
      const params = new URLSearchParams();
      params.append("MediaId", 154);
      console.log(params.values(), "WHat is my dat");
      // params.append('lastName', 'fred');
      // axios.post('/user', params);
      // const payload = { MediaId: data };
      // var mediaId = qs.stringify(payload);
      // console.log(mediaId, "data ");
      try {
        let fata = await axios.post(
          "http://54.144.168.52:3000/user",
          QueryString.stringify({
            MediaId: 154, //gave the values directly for testing
          }),
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              authorization: JWT,
            },
          }
        );
        console.log(fata.data, "user setting api image");
      } catch (error) {
        // setIsLoading(false);
        toast.error(error);
        // console.log(error, "api payload");
        // console.log("if user error", isLoading);
      }
    } else if (name && !data && !number && !description) {
      formData.append("FullName", name);
      formData.append("UserName", name);

      try {
        let fata = await axios.post(
          "http://54.144.168.52:3000/user",
          { FullName: name, UserName: name },
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              authorization: JWT,
            },
          }
        );
        console.log(fata, "user setting api name");
      } catch (error) {
        // setIsLoading(false);
        toast.error(error);
        // console.log(error, "api payload");
        // console.log("if user error", isLoading);
      }
    } else if (name && !data && number && !description) {
      formData.append("FullName", name);
      formData.append("UserName", name);
      formData.append("PhoneNumber", number);
      try {
        let fata = await axios.post(
          "http://54.144.168.52:3000/user",
          formData,
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              authorization: JWT,
            },
          }
        );
      } catch (error) {
        // setIsLoading(false);
        toast.error(error);
        // console.log(error, "api payload");
        // console.log("if user error", isLoading);
      }
    } else if (name && !data && number && description) {
      formData.append("FullName", name);
      formData.append("UserName", name);
      formData.append("PhoneNumber", number);
      formData.append("About", description);
      try {
        let fata = await axios.post(
          "http://54.144.168.52:3000/user",
          formData,
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              authorization: JWT,
            },
          }
        );
      } catch (error) {
        // setIsLoading(false);
        toast.error(error);
        // console.log(error, "api payload");
        // console.log("if user error", isLoading);
      }
    } else if (name && data && number && description) {
      formData.append("FullName", name);
      formData.append("UserName", name);
      formData.append("PhoneNumber", number);
      formData.append("About", description);
      formData.append("MediaId", data);
      try {
        let fata = await axios.post(
          "http://54.144.168.52:3000/user",
          formData,
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              authorization: JWT,
            },
          }
        );
      } catch (error) {
        // setIsLoading(false);
        toast.error(error);
        // console.log(error, "api payload");
        // console.log("if user error", isLoading);
      }
    }
  };

  return (
    <div>
      <div className="md:max-w-[700px]  flex-grow  bg-white ">
        <div className="shadow-lg md:rounded-lg">
          <div className="p-5">
            <h1 className="flex items-center justify-between">
              <span
                className="flex-grow-0 float-left cursor-pointer md:hidden"
                onClick={() => router.push("/settings")}
              >
                <ChevronLeftIcon className="h-6 w-6 sm:w-8 sm:h-8 text-[#E9813B] cursor-pointer" />
              </span>
              <span className="pl-2 text-xl   font-bold text-[#0E134F]">
                Profile Settings
              </span>
              <span className="flex text-sm items-center px-4 py-1 bg-[#E4FAE2] rounded-tl-full rounded-bl-full  float-right font-normal -mr-5 md:hidden">
                <UserAddIcon className="w-4 h-4 text-[#34AC29] mr-2" />
                <span className="text-[#34AC29] ">Verified</span>
              </span>
            </h1>
          </div>
          <hr className="w-[100%] mx-auto border-gray-200" />

          <div className="flex flex-wrap justify-between p-5 mb-32">
            <div className="flex-grow   md:max-w-[240px]  p-8 sm:min-w-[300px] min-w-[240px] ">
              {/* yhan */}
              {/* {!selectedFile && (
                <div className="flex items-center justify-center mx-auto  rounded-full w-28 h-28 md:mx-4 md:h-36 md:w-36 bg-[#FCEDE4] relative">
                  <UserIcon className="w-[72px] h-[72px] md:w-[80px] md:h-[80px]  text-[#E9813B] " />
                  <div
                    onClick={() => filePickerRef.current.click()}
                    className="absolute  p-1 md:p-[6px] bg-white border-[#E9813B] cursor-pointer rounded-full bottom-0 right-1 border  "
                  >
                    <UploadIcon className="md:h-6 md:w-6 h-5 w-5  text-[#E9813B] " />
                  </div>
                  <input
                    ref={filePickerRef}
                    type="file"
                    className="hidden"
                    onChange={fileSelectedHandler}
                  />
                </div>
              )} */}
              {/* {selectedFile && ( */}
              <div className="relative sm:w-[160px] sm:h-[160px] mx-auto rounded-full w-[138px] h-[138px] border">
                <div className=" bg-gray-100 relative border sm:w-[160px] sm:h-[160px] mx-auto  rounded-full sm:py-[34px] px-2 w-[138px] h-[138px]">
                  <Image
                    src={
                      selectedFile
                        ? selectedFile
                        : imageBaseUrl + userProfileData?.Media?.Path
                    }
                    alt="infoImg"
                    layout="fill"
                    className="rounded-full"
                    objectfit="cover"
                  />
                </div>
                {selectedFile ? (
                  <XIcon
                    onClick={() => setSelectedFile(null)}
                    className="absolute top-0 w-8 h-8 p-1 text-gray-500 bg-white border rounded-full cursor-pointer right-1"
                  />
                ) : (
                  <>
                    <div
                      onClick={() => filePickerRef.current.click()}
                      className="absolute  p-1 md:p-[6px] bg-white border-[#E9813B] cursor-pointer rounded-full bottom-0 right-1 border  "
                    >
                      <UploadIcon className="md:h-6 md:w-6 h-5 w-5  text-[#E9813B] " />
                    </div>
                    <input
                      ref={filePickerRef}
                      type="file"
                      className="hidden"
                      onChange={fileSelectedHandler}
                    />
                  </>
                )}
              </div>
              {/* )} */}
            </div>
            {/* {userProfileData?.map((item, index) => {
              console.log(item);
              return ( */}
            <>
              <div className="flex-grow  md:max-w-[400px] min-w-[240px]">
                <p htmlFor="name" className="mt-6 ">
                  Name
                </p>
                <input
                  type="text"
                  placeholder={userProfileData?.FullName}
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="flex-grow block w-full p-3 mt-2 rounded-lg shadow-md outline-none"
                />
                <p htmlFor="name" className="mt-6 ">
                  Contact Number
                </p>
                <input
                  type="number"
                  placeholder={userProfileData?.PhoneNumber}
                  name="name"
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                  className="flex-grow block w-full p-3 mt-2 rounded-lg shadow-md outline-none"
                />
                <p htmlFor="name" className="mt-6 ">
                  About Yourself
                </p>
                <textarea
                  rows="4"
                  type="text"
                  placeholder={userProfileData?.About}
                  name="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="flex-grow block w-full p-3 mt-2 rounded-lg shadow-md outline-none resize-none"
                />
                <button
                  className="font-semibold mx-2 bg-[#ED974B] bg-gradient-to-tr  py-[10px] sm:py-3 px-7 rounded-full text-white from-[#E77334] to-[#ED974B] w-[97%] hover:from-[#ff6715] mt-10"
                  onClick={onSave}
                >
                  Save
                </button>
              </div>
            </>
            {/* );
            })} */}
            {/* // )})} */}
          </div>
        </div>
      </div>
      <Loader />
      <ToastContainer />
    </div>
  );
};

export default ProfileSettings;
