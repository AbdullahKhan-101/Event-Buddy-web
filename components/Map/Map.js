import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import GoogleMapReact from "google-map-react";
import MyMarker from "./Marker";
import { imageBaseUrl } from "../../config/utils";
const distanceToMouse = (pt, mp) => {
  if (pt && mp) {
    return Math.sqrt(
      (pt.x - mp.x) * (pt.x - mp.x) + (pt.y - mp.y) * (pt.y - mp.y)
    );
  }
};

export default function Map({ locations, from }) {
  const [points, setPoints] = useState([]);
  useEffect(() => {
    setMarker();
  }, []);
  const setMarker = () => {
    let array = [];
    if (from == "Home") {
      locations?.map((item) => {
        if (item.Location != null) {
          array?.push({
            _id: item?.Id,
            title: "York, North Yorkshire",
            latitude: item?.Location?.Lat,
            longitude: item?.Location?.Lng,
            image: imageBaseUrl + item?.Media?.Path,
          });
        }
      });
      setPoints(array);
    } else {
      array?.push({
        _id: 1,
        title: "York, North Yorkshire",
        latitude: locations?.lat,
        longitude: locations?.lng,
        image: "/myMarker.png",
      });
    }
    setPoints(array);
    return;
  };

  // const points = [
  //   {
  //     id: 1,
  //     title: "York, North Yorkshire",
  //     latitude: locations?.lat,
  //     longitude: locations?.lng,
  //     image: "/myMarker.png",
  //   },
  // ];
  const filterMapData = points?.map((item) => item);

  return (
    <div className="App">
      <GoogleMapReact
        bootstrapURLKeys={{
          key: "AIzaSyDh0f846bnmUxgSw6n5XtIZb01xtprxQfs",
        }}
        center={{
          lat: from == "Home" ? points[0]?.latitude : locations?.lat,
          lng: from == "Home" ? points[0]?.longitude : locations?.lng,
        }}
        defaultZoom={25}
        distanceToMouse={distanceToMouse}
      >
        {filterMapData?.map(({ latitude, longitude, city, _id, image }) => {
          return (
            <MyMarker
              key={_id}
              lat={latitude}
              lng={longitude}
              text={city}
              tooltip={city}
              image={image}
              item={_id}
            />
          );
        })}
      </GoogleMapReact>
    </div>
  );
}
