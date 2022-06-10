import React, { useState } from "react";
import { ChevronLeftIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
const ChangePass = () => {
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [reNewPass, setReNewPass] = useState("");

  const ChangePassword = async () => {
    const JWT = localStorage.getItem("JWTEventBuddy");
    if (!oldPass && !newPass && !reNewPass) {
      toast.error("Please Fill All Fields..");
    } else {
      if (newPass == reNewPass) {
        const params = new URLSearchParams();
        params.append("OldPassword", oldPass);
        params.append("Password", newPass);
        try {
          let fata = await axios.put("http://54.144.168.52:3000/user", params, {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              authorization: JWT,
            },
          });
          // console.log(fata, "Change Pass");
          if (fata?.data?.Status == 200) {
            toast.success("Password Changed Successfully");
            setOldPass("");
            setNewPass("");
            setReNewPass("");
          } else {
            toast.error("Incorrect Old Password");
          }
        } catch (error) {
          toast.error(error);
          // console.log(error, "api payload");
        }
      } else {
        toast.error("Passwords Not Matched..");
      }
    }
  };
  const router = useRouter();
  return (
    <div>
      <div className="md:max-w-[700px]  flex-grow  bg-white ">
        <div className="shadow-lg md:rounded-lg">
          <div className="p-5">
            <h1 className="text-[#0E134F]  text-xl text-center sm:px-2 px-1 font-strongg flex items-center">
              <span
                className="flex-grow-0 float-left cursor-pointer md:hidden"
                onClick={() => router.push("/settings")}
              >
                <ChevronLeftIcon className="h-6 w-6 sm:w-8 sm:h-8 text-[#E9813B]" />
              </span>
              <span className="flex-grow md:flex-grow-0">Change Password</span>
            </h1>
          </div>
          <hr className="w-[100%] mx-auto border-gray-200" />
          <div className="flex flex-wrap justify-between p-5 mb-32">
            <div className="flex-grow  md:max-w-[400px] min-w-[240px]">
              <p htmlFor="name" className="mt-6 font-normall">
                Old Password
              </p>
              <input
                type="password"
                placeholder="Enter New Password"
                name="name"
                value={oldPass}
                onChange={(e) => setOldPass(e.target.value)}
                className="flex-grow block w-full p-3 mt-2 rounded-lg shadow-md outline-none font-normall"
              />
              <p htmlFor="name" className="mt-6 font-normall">
                New Password
              </p>
              <input
                type="password"
                placeholder="Enter New password"
                name="name"
                value={newPass}
                onChange={(e) => setNewPass(e.target.value)}
                className="flex-grow block w-full p-3 mt-2 rounded-lg shadow-md outline-none font-normall"
              />
              <p htmlFor="name" className="mt-6 font-normall">
                Re-enter password
              </p>
              <input
                type="password"
                placeholder="Re-Enter New Password"
                name="name"
                value={reNewPass}
                onChange={(e) => setReNewPass(e.target.value)}
                className="flex-grow block w-full p-3 mt-2 rounded-lg shadow-md outline-none resize-none font-normall"
              />
              <button
                className="font-mediumm mx-2 bg-[#ED974B] bg-gradient-to-tr  py-[10px] sm:py-3 px-7 rounded-full text-white from-[#E77334] to-[#ED974B] w-[97%] hover:from-[#ff6715] mt-10"
                onClick={ChangePassword}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ChangePass;
