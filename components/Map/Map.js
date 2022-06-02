import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import GoogleMapReact from "google-map-react";
import MyMarker from "./Marker";
const distanceToMouse = (pt, mp) => {
  if (pt && mp) {
    return Math.sqrt(
      (pt.x - mp.x) * (pt.x - mp.x) + (pt.y - mp.y) * (pt.y - mp.y)
    );
  }
};

export default function Map({ locations }) {
  const points = [
    {
      id: 1,
      title: "York, North Yorkshire",
      latitude: locations?.lat,
      longitude: locations?.lng,
      image: "/myMarker.png",
    },
  ];

  const filterMapData = points?.map((item) => item);
  const finalData = filterMapData?.map((item, indx) => {
    return item;
  });

  return (
    <div className="App">
      <GoogleMapReact
        bootstrapURLKeys={{
          key: "AIzaSyDh0f846bnmUxgSw6n5XtIZb01xtprxQfs",
        }}
        center={{ lat: locations?.lat, lng: locations?.lng }}
        defaultZoom={25}
        distanceToMouse={distanceToMouse}
      >
        {finalData?.map(({ latitude, longitude, city, _id, image }) => {
          return (
            <MyMarker
              key={_id}
              lat={latitude}
              lng={longitude}
              text={city}
              tooltip={city}
              image={image}
            />
          );
        })}
      </GoogleMapReact>
    </div>
  );
}
