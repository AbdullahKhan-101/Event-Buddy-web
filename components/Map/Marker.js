import React from "react";

const MyMarker = ({ image }) => {
  return (
    <div
      style={{
        display: "flex",
        height: "8rem",
        width: "8rem",
        justifyContent: "center",
        transform: "translate(-50%, -50%)",
      }}
      className="circle hover"
    >
      <div
        style={{
          border: "5px solid #E9813B",
          height: "5em",
          width: "5em",
          borderRadius: "50px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <img
          src={image}
          alt="infoImg"
          style={{
            height: 110,
            width: 110,

            position: "absolute",
            marginTop: -29,
          }}
        />
      </div>
      <img
        src="/arrow.png"
        alt="infoImg"
        layout="fill"
        objectfit="contain"
        style={{ height: "3rem", position: "absolute", marginTop: "36px" }}
      />
    </div>
  );
};

export default MyMarker;
