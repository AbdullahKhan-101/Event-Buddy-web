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
const [pic, setPic] = useState();
console.log('---------->',photoRef)
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
var img = new Image();
img.src = photo.toDataURL();
setPic(img.src)
// debugger;
// console.log('---------->',photoRef)
// console.log(img.src);
// upload(img.src)
  };
  useEffect(() => {
    getUserCamera();
  }, [videoRef]);

  function DataURIToBlob(dataURI) {
    const splitDataURI = dataURI.split(',')
    const byteString = splitDataURI[0].indexOf('base64') >= 0 ? atob(splitDataURI[1]) : decodeURI(splitDataURI[1])
    const mimeString = splitDataURI[0].split(':')[1].split(';')[0]

    const ia = new Uint8Array(byteString.length)
    for (let i = 0; i < byteString.length; i++)
        ia[i] = byteString.charCodeAt(i)

    return new Blob([ia], { type: mimeString })
  }
  const upload = async (image) => {
    const file = DataURIToBlob(pic)
const formData = new FormData();
formData.append('file', file, 'image.jpg') 
console.log("--------->",file);
const jwt = localStorage.getItem('JWT')
      try {
        let fata = await axios.post(
          "http://54.144.168.52:3000/media/upload",
          formData,
          {
            headers:{
              "Content-Type":"multipart/form-data",
              "authorization":jwt
            }
          }
        );
        console.log(fata, "api payload");
        if (fata?.data?.Status == 200) {
          localStorage.setItem('userSelfieImage', JSON.stringify({MediaId:fata?.data?.Data?.Id ,path:fata?.data?.Data?.MediaObject?.Path}))
         router.push('/verifyPicture')
          closeCamera();
        
          // if (!fata?.data?.Data?.User?.Media) {
          // router.push("/uploadPicture");
          // } else if (!fata?.data?.Data?.User?.SelfieMedia) {
          //   router.push("/selfie");
          // } else {
          //   localStorage.setItem("user", fata?.data?.Data?.User);
          //   localStorage.setItem("JWT", fata?.data?.Data?.Token);
          //   router.push("/home");
          // }
        } else {
          // toast.error(fata?.data?.Message);
          // console.log(fata, "api payload");
          toast.error(fata?.data?.Message);
          throw new Error(fata?.data);
        }
      } catch (error) {
        toast.error(error);
        console.log(error, "api payload");
      }
  };
  return (
    <div className="">
      <div className="bg-black h-[100vh] sm:h-[92vh]">
        <div style={{display:'flex',
        height:'100%',
        justifyContent:'center',
        alignItems:'center'}}>
     <video
          ref={videoRef}
          // className=" w-full  md:h-[92vh] h-[80vh]"
          style={{ 
            flex:1,
            // width :'100%',
            //  height: '100%'
            }}
        ></video>
        <div style={{ flex:1, height: '100%', position:'relative',display:'flex',alignItems:'center'}}>
     
     <div style={{ opacity:noPhoto == true?1:0,background:'#000', position:'absolute',top:0,right:0,left:0,bottom:0,zIndex:0,display:'flex',justifyContent:'center',alignItems:'center'}}>
       <p style={{color:'white',width:'100%',marginRight:'-73%' }}>Image Preview (Please Capture Image)</p>
    </div>
   <canvas
          ref={photoRef}
          // className="w-full  md:h-[92vh] h-[80vh]"
          style={{ width :'100%', height: '71.5%'}}
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
        {noPhoto == true ? <div
          onClick={takePicture}
          className="p-3 bg-red-600 border rounded-full cursor-pointer"
        >
          <CameraIcon className="w-6 h-6 text-white" />
          </div>:
         <> <div
          onClick={()=>setNoPhoto(true)}//router.reload()}
          className="p-3 bg-red-600 border rounded-full cursor-pointer"
        >
          <XIcon
            
            className="flex-grow w-6 h-6 text-gray-200"
          />
        </div> <div
          onClick={upload}
          className="p-3 bg-red-600 border rounded-full cursor-pointer"
        >
          <span style={{color:'white'}}>Upload</span>
        </div></>}
      </div>
    </div>
  );
};

export default Selfie;
