import React from "react";
import { useRouter } from "next/router";
import Nav from "./Nav";
import ProfileSettings from "./ProfileSettings";
import LeftSettingBar from "./LeftSettingBar";
import Notifications from "./Notifications";

const Settings = () => {
  const router = useRouter();
  const label = { inputProps: { "aria-label": "Switch demo" } };

  return (
    <div>
      <Nav active="settings" />
      <div className="p-2 mx-auto mt-0 max-w-7xl md:mt-5 "></div>
      <div className="flex flex-wrap mx-auto justify-evenly max-w-7xl ">
        <div className="flex-grow md:max-w-[410px] bg-white">
          <LeftSettingBar />
        </div>
        <div className="md:max-w-[700px]  flex-grow bg-white hidden md:block">
          <ProfileSettings />
        </div>
      </div>

      <Notifications />
    </div>
  );
};

export default Settings;
