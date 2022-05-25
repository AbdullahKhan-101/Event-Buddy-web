import React from "react";
// import arrow from "../../public/arrow.png";
import Image from "next/image";
const MyMarker = ({ text, tooltip, $hover, image }) => {
  const handleClick = () => {
    // console.log(`You clicked on ${tooltip}`);
  };
  // console.log(`You clicked on ${image}`);
  return (
    <div
      style={{
        display: "flex",
        height: "8rem",
        width: "8rem",
        justifyContent: "center",
        transform: "translate(-50%, -50%)",
        // border: "5px solid red",
      }}
      className="circle hover"
      // onClick={handleClick}
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
          // layout="fill"
          // objectfit="cover"
          style={{
            height: 110,
            width: 110,
            // verticalAlign: "top",
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
    // <div className=/*{$hover ?*/ "circle hover" /*: "circle"}*/ onClick={handleClick}>
    //   <span className="circleText">
    //     {text}
    //   </span>
    // </div>
  );
};

export default MyMarker;

// import React from 'react';
// import classes from "../../Styling/marker.module.css"

// const Marker = (props) => {
//     const { color, name,position,lng,lat} = props;
//     return (
//       <div className={classes.marker}
//         style={{ backgroundColor: color, cursor: 'pointer'}}
//         title={name}
//         position={{lng ,lat}}
//       />
//     );
//   };

//   export default Marker;
