import React, { useEffect, useState } from "react";
import UploadPicture from "../components/UploadPicture";
import Image from "next/image";
import { useRouter } from "next/router";
const UploadProfilePicture = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const JWT = localStorage.getItem("JWT");
    if (!JWT) {
      router.push("/login");
    } else {
      setLoggedIn(true);
    }
  }, []);
  return (
    <>
      {loggedIn && (
        <div>
          <UploadPicture />
          <div className="fixed top-0 md:h-[131px] h-[106px] w-52 md:w-64 hidden lg:block ">
            <Image
              src="/bgdesign1.png"
              alt="infoImg"
              layout="fill"
              objectfit="contain"
            />
          </div>
          <div className="fixed bottom-0 right-0 hidden h-[107px] -mt-3 w-64  lg:block ">
            <Image
              src="/bgdesign2.png"
              alt="infoImg"
              layout="fill"
              objectfit="contain"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default UploadProfilePicture;
