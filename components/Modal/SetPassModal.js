import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import Image from "next/image";
import { XIcon } from "@heroicons/react/solid";
import AOS from "aos";
import "aos/dist/aos.css";

function SetPassModal({ closeModal }) {
  const [passReqNext, setPassReqNext] = useState(true);
  const [emailAuth, setEmailAuth] = useState(false);
  const [newPasssubmit, setNewPassSubmit] = useState(false);
  const [data, setData] = useState({ email: "", code: "", password: "" });
  useEffect(() => {
    AOS.init();
  }, []);
  const handleInputs = (e) => {
    let name, value;
    name = e.target.name;
    value = e.target.value;
    setData({ ...data, [name]: value });
  };
  const AuthNext = async () => {
    if (!data.email) {
      toast.error("Please Enter Email");
    } else {
      const payload = {
        Email: data.email,
      };
      try {
        let fata = await axios.post(
          "http://54.144.168.52:3000/user/forget-password",
          payload
        );
        // console.log(fata, "api payload");
        if (fata?.data?.Status == 200) {
          setData({ ...data, email: "" });
          closeModal(false);
          toast.success(fata?.data?.Data?.Message);
        } else {
          toast.error(fata?.data?.Message);
          throw new Error(fata?.data);
        }
      } catch (error) {
        toast.error(error);
        // console.log(error, "api payload");
      }
    }
  };

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <>
      <div
        data-aos="fade-zoom-in"
        data-aos-easing="ease-in-back"
        data-aos-delay="200"
        data-aos-offset="0"
        className="fixed top-0 right-0 bg-white w-[100%] h-[100vh] bg-opacity-70 z-10"
      >
        <div
          onClick={() => closeModal(false)}
          className="w-[100%] h-[100vh] bg-white fixed top-0  bg-opacity-20 right-0 left-0 "
        ></div>
        <div
          data-aos="fade-up"
          data-aos-delay="300"
          data-aos-duration="900"
          className="fixed rounded-xl p-4 md:p-10 bg-white shadow-2xl top-11 w-[95%] max-w-[620px] mx-auto right-0 left-0 md:top-20"
        >
          <h1 className=" text-[#0E134F]  text-[28px] text-center  px-1 font-bold flex items-center">
            <span className="flex-grow font-strongg">Forgot Password..?</span>
          </h1>
          <div className="px-2 py-3 my-6 space-y-5 ">
            <div className="flex items-center pl-2 bg-white border rounded-xl">
              <input
                name="email"
                type="email"
                placeholder="Please Enter Your Email Address"
                id="exampleInputEmail1"
                onChange={handleInputs}
                autoComplete="off"
                className="block w-full p-4 border-none outline-none rounded-xl font-normall"
              />
            </div>
          </div>
          <button
            onClick={AuthNext}
            className="font-semibold mx-2 bg-[#ED974B] bg-gradient-to-tr  py-[10px] sm:py-3 px-7 rounded-full text-white from-[#E77334] to-[#ED974B] w-[97%] hover:from-[#ff6715] mt-0"
          >
            Send
          </button>
          <XIcon
            onClick={() => {
              closeModal(false);
            }}
            className="absolute p-1 text-gray-500 bg-white border rounded-full cursor-pointer h-9 w-9 -right-2 -top-5"
          />
        </div>
      </div>
    </>
    // <div className={classes.modalBackground}>
    //   <div
    //     className={classes.modalCloseBackground}
    //     onClick={() => closeModal(false)}
    //   ></div>
    //   <div className={classes.modalContainer}>
    //     <div className={classes.titleCloseBtn}>
    //       <button onClick={() => closeModal(false)}>X</button>
    //     </div>
    //     <div className={classes.title}>
    //       <h1 className={classes.h1}>Forget Password..?</h1>
    //     </div>
    //     <div className={classes.body}>
    //       <Input
    //         required=""
    //         name="email"
    //         type="email"
    //         className={classes.input}
    //         placeholder="Please Enter Your Email Address"
    //         id="exampleInputEmail1"
    //         onChange={handleInputs}
    //         autoComplete="off"
    //       />
    //     </div>
    //     <div className={classes.footer}>
    //       <button className={classes.nextBtn} onClick={AuthNext}>
    //         Send
    //       </button>
    //     </div>
    //   </div>
    //   <ToastContainer />
    // </div>
  );
}

export default SetPassModal;
