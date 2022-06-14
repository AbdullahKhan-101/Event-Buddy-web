import React, { useEffect } from "react";
import TermnConditionM from "../components/TermnConditionM";
import Image from "next/image";
import { useRouter } from "next/router";
const TermsnConditionss = () => {
  const router = useRouter();

  return (
    <div>
      <TermnConditionM />
      <div className="absolute bg-[url('/bgdesign1.png')] top-0 md:h-[131px] h-[106px] w-52 md:w-64  bg-no-repeat"></div>
      <div className="absolute bottom-0 right-0 hidden h-[107px] bg-[url('/bgdesign2.png')] -mt-3 w-64  md:block bg-no-repeat"></div>
    </div>
  );
};

export default TermsnConditionss;
