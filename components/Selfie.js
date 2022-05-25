import {
  CogIcon,
  MenuIcon,
  UserIcon,
  VideoCameraIcon,
  XIcon,
} from "@heroicons/react/outline";
import React, { useEffect, useState, useRef } from "react";
import { CameraIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import { ConstructionOutlined } from "@mui/icons-material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";



const WIDTH = 500;
const HEIGHT = 500;

const Selfie = () => {
  const router = useRouter();
  const [play, setPlay] = useState(false);
const [noPhoto, setNoPhoto] = useState(true);

  const openCamera = () => {};
  const closeCamera = () => {
    let video = videoRef.current;

    video.srcObject.getTracks()[0].stop();
  };

  let videoRef = useRef(null);
  let photoRef = useRef(null);

  // get access to user web camera

  const getUserCamera = () => {
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
  const takePicture = () => {
    const width = 400;
    const height = width / (16 / 9);

    let video = videoRef.current;

    let photo = photoRef.current;
    photo?.width = width;

    photo?.height = height;
    let ctx = photo?.getContext("2d");
// upload(photo?.current.toBlob())
    ctx?.drawImage(video, 0, 0, width, height);
    setNoPhoto(false);
    // photo?.toDataURL("image/png")
// var img = new Image();
// img.src = photo.toDataURL();
// debugger;
// console.log(img);

  };
  useEffect(() => {
    getUserCamera();
  }, [videoRef]);


  const upload = async (image) => {
// console.log(image);
    // const formData = new FormData();
    // formData.append('file',image)
    //   try {
    //     let fata = await axios.post(
    //       "http://54.144.168.52:3000/media/upload",
    //       formData,
    //       {
    //         headers:{
    //           "Content-Type":"multipart/form-data",
    //           "authorization":"5bf8aa42-50e2-4567-a0ab-6ef064c06eba"
    //         }
    //       }
    //     );
    //     console.log(fata, "api payload");
    //     debugger;
    //     if (fata?.data?.Status == 200) {
    //       setEmail("");
    //       setPassword("");
    //       // if (!fata?.data?.Data?.User?.Media) {
    //       router.push("/uploadPicture");
    //       // } else if (!fata?.data?.Data?.User?.SelfieMedia) {
    //       //   router.push("/selfie");
    //       // } else {
    //       //   localStorage.setItem("user", fata?.data?.Data?.User);
    //       //   localStorage.setItem("JWT", fata?.data?.Data?.Token);
    //       //   router.push("/home");
    //       // }
    //     } else {
    //       // toast.error(fata?.data?.Message);
    //       // console.log(fata, "api payload");
    //       toast.error(fata?.data?.Message);
    //       throw new Error(fata?.data);
    //     }
    //   } catch (error) {
    //     toast.error(error);
    //     console.log(error, "api payload");
      // }
  };
  return (
    <div className="">
      <div className="bg-black h-[100vh] sm:h-[92vh]">
        <div style={{display:'flex',flexDirection:'row', height:'100%'}}>
       <video
          ref={videoRef}
          // className=" w-full  md:h-[92vh] h-[80vh]"
          style={{ width : '50%', height:'100%'}}
        ></video>
         <canvas
          ref={photoRef}
          // className="w-full  md:h-[92vh] h-[80vh]"
          style={{width : '50%', height:'100%'}}
        ></canvas>
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
        <div
          onClick={takePicture}
          className="p-3 bg-red-600 border rounded-full cursor-pointer"
        >
          <CameraIcon className="w-6 h-6 text-white" />
        </div>
      </div>

      <button
        onClick={() => router.push("/uploadPicture")}
        className="fixed px-4 py-2 font-semibold uppercase bg-gray-200 rounded-lg lg:left-12 lg:bottom-5 hover:bg-gray-400 left-2 bottom-1"
      >
        Back
      </button>
      <button
        onClick={() => router.push("/verifyPicture")}
        className="fixed px-4 py-2 font-semibold uppercase bg-gray-200 rounded-lg lg:right-12 lg:bottom-5 hover:bg-gray-400 right-2 bottom-1"
      >
        Next
      </button>
    </div>
  );
};

export default Selfie;
