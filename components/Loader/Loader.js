import React from "react";
import ClipLoader from "react-spinners/ClipLoader";

const Loader = () => {
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
      }}
      className="bg-opacity-60 bg-slate-500 z-50"
    >
      <div
        style={{
          display: "flex",
          // flex: 1,
          justifyContent: "center",
          alignItems: "center",
          zIndex: 99,
          position: "absolute",
          alignSelf: "center",
          height: "100vh",
          width: "100vw",
        }}
      >
        <ClipLoader color="#ED974B" loading={true} size={50} />
      </div>
    </div>
  );
};

export default Loader;
