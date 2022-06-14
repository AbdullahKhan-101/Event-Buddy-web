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
import { useDispatch } from "react-redux";
import { imageBaseUrl } from "../config/utils";
import { useRecoilState } from "recoil";
import { loadingState } from "../atoms/modalAtom";
import Loader from "./Loader";
import axios from "axios";
import { baseUrl } from "../config/utils";
const ProfileSettings = () => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [description, setDescription] = useState("");
  const [selectedImage, setSelectedImage] = useState();
  const filePickerRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const router = useRouter();
  const [loading, setLoading] = useRecoilState(loadingState);
  const [user, setUser] = useState();

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
  useEffect(() => {
    getUserDetailsApi();
    loadingTrue();
  }, []);
  const loadingTrue = () => {
    setLoading(true);
  };
  const getUserDetailsApi = async () => {
    const jwt = localStorage.getItem("JWTEventBuddy");
    await axios
      .get(
        `
        ${baseUrl}user/me`,
        {
          headers: {
            authorization: jwt,
          },
        }
      )
      .then((res) => {
        localStorage.setItem(
          "user",
          JSON.stringify({
            user: res?.data?.Data?.User,
          })
        );
        setUser(res?.data?.Data?.User);
        getUserDetails();
      });
  };
  const getUserDetails = async () => {
    const User = await localStorage.getItem("user");
    const user = JSON.parse(User);
    // setUser(user?.user);
  };
  const onSave = async (image) => {
    const JWT = localStorage.getItem("JWTEventBuddy");
    if (selectedImage) {
      const formData = new FormData();
      formData.append("file", selectedImage);
      try {
        let fata = await axios.post(`${baseUrl}media/upload`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            authorization: JWT,
          },
        });
        // console.log(fata, "image response");
        if (fata?.data.Status == 200) {
          updateProfile(fata?.data?.Data?.Id);
        } else {
          throw new Error(fata?.data);
        }
      } catch (error) {
        toast.error(error);
      }
    } else {
      updateProfile();
    }
  };
  const updateProfile = async (data) => {
    // console.log(data, "data ");
    const JWT = localStorage.getItem("JWTEventBuddy");
    if (data) {
      const params = new URLSearchParams();
      params.append("MediaId", data);

      try {
        let fata = await axios.put(`${baseUrl}user`, params, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            authorization: JWT,
          },
        });
        // console.log(fata, "user setting api image");
        if (fata?.data?.Data?.Message == "Updated") {
          localStorage.setItem(
            "user",
            JSON.stringify({
              user: fata?.data?.Data?.User,
            })
          );
          getUserDetails();
          setSelectedFile(null);
          setSelectedImage("");
        }
      } catch (error) {
        toast.error(error);
      }
    } else if (name && !data && !number && !description) {
      const params = new URLSearchParams();
      params.append("FullName", name);
      params.append("UserName", name);

      try {
        let fata = await axios.put(`${baseUrl}user`, params, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            authorization: JWT,
          },
        });
        if (fata?.data?.Data?.Message == "Updated") {
          localStorage.setItem(
            "user",
            JSON.stringify({
              user: fata?.data?.Data?.User,
            })
          );
          getUserDetails();
          setName("");
        }
      } catch (error) {
        toast.error(error);
      }
    } else if (!name && !data && !number && description) {
      const params = new URLSearchParams();

      params.append("About", description);
      try {
        let fata = await axios.put(`${baseUrl}user`, params, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            authorization: JWT,
          },
        });
        if (fata?.data?.Data?.Message == "Updated") {
          localStorage.setItem(
            "user",
            JSON.stringify({
              user: fata?.data?.Data?.User,
            })
          );
          getUserDetails();
          setSelectedFile(null);
          setDescription("");
        }
      } catch (error) {
        toast.error(error);
      }
    } else if (!name && !data && number && !description) {
      const params = new URLSearchParams();
      params.append("PhoneNumber", number);
      try {
        let fata = await axios.put(`${baseUrl}user`, params, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            authorization: JWT,
          },
        });
        if (fata?.data?.Data?.Message == "Updated") {
          localStorage.setItem(
            "user",
            JSON.stringify({
              user: fata?.data?.Data?.User,
            })
          );
          getUserDetails();
          setNumber("");
        }
      } catch (error) {
        toast.error(error);
      }
    } else if (name && !data && number && !description) {
      const params = new URLSearchParams();
      params.append("FullName", name);
      params.append("UserName", name);
      params.append("PhoneNumber", number);
      try {
        let fata = await axios.put(`${baseUrl}user`, params, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            authorization: JWT,
          },
        });
        if (fata?.data?.Data?.Message == "Updated") {
          localStorage.setItem(
            "user",
            JSON.stringify({
              user: fata?.data?.Data?.User,
            })
          );
          getUserDetails();
          setNumber("");
          setName("");
        }
      } catch (error) {
        toast.error(error);
      }
    } else if (name && !data && number && description) {
      const params = new URLSearchParams();
      params.append("FullName", name);
      params.append("UserName", name);
      params.append("PhoneNumber", number);
      params.append("About", description);
      try {
        let fata = await axios.put(`${baseUrl}user`, params, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            authorization: JWT,
          },
        });
        if (fata?.data?.Data?.Message == "Updated") {
          localStorage.setItem(
            "user",
            JSON.stringify({
              user: fata?.data?.Data?.User,
            })
          );
          getUserDetails();
          setNumber("");
          setName("");
          setDescription("");
        }
      } catch (error) {
        toast.error(error);
      }
    } else if (name && data && number && description) {
      const params = new URLSearchParams();
      params.append("FullName", name);
      params.append("UserName", name);
      params.append("PhoneNumber", number);
      params.append("About", description);
      params.append("MediaId", data);
      try {
        let fata = await axios.put(`${baseUrl}user`, params, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            authorization: JWT,
          },
        });
        if (fata?.data?.Data?.Message == "Updated") {
          localStorage.setItem(
            "user",
            JSON.stringify({
              user: fata?.data?.Data?.User,
            })
          );
          getUserDetails();
          setSelectedFile(null);
          setNumber("");
          setName("");
          setDescription("");
        }
      } catch (error) {
        toast.error(error);
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
              <div className="relative sm:w-[160px] sm:h-[160px] mx-auto rounded-full w-[138px] h-[138px] border">
                <div className=" bg-gray-100 relative border sm:w-[160px] sm:h-[160px] mx-auto  rounded-full sm:py-[34px] px-2 w-[138px] h-[138px]">
                  <Image
                    src={
                      selectedFile
                        ? selectedFile
                        : imageBaseUrl + user?.Media?.Path
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
            </div>
            <>
              <div className="flex-grow  md:max-w-[400px] min-w-[240px]">
                <p htmlFor="name" className="mt-6 ">
                  Name
                </p>
                <input
                  type="text"
                  placeholder={user?.FullName}
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="flex-grow block w-full p-3 mt-2 rounded-lg shadow-md outline-none"
                />
                <p htmlFor="name" className="mt-6 ">
                  Contact Number
                </p>
                <input
                  type="text"
                  placeholder={user?.PhoneNumber}
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
                  placeholder={user?.About}
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
          </div>
        </div>
      </div>
      <Loader />
      <ToastContainer />
    </div>
  );
};

export default ProfileSettings;
