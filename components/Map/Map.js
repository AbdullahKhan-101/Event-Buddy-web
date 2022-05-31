import React, { useState, useEffect } from "react";
// import "../../styles/globals.css";
import { useDispatch, useSelector } from "react-redux";
import { HomeActions } from "../../store/actions";
import GoogleMapReact from "google-map-react";
import MyMarker from "./Marker";
// implementation of this function is needed for codesandbox example to work
// you can remove it otherwise
const distanceToMouse = (pt, mp, markerProps) => {
  if (pt && mp) {
    // return distance between the marker and mouse pointer
    // console.log("--------------------->", pt, mp, "marker", markerProps);
    return Math.sqrt(
      (pt.x - mp.x) * (pt.x - mp.x) + (pt.y - mp.y) * (pt.y - mp.y)
    );
  }
};

export default function Map({ locations }) {
  // console.log("Location i", locations);
  const dispatch = useDispatch();
  useEffect(() => {
    getLocation();
  }, []);
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [status, setStatus] = useState(null);

  const getLocation = () => {
    if (!navigator.geolocation) {
      setStatus("Geolocation is not supported by your browser");
    } else {
      setStatus("Locating...");
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setStatus(null);
          setLat(position.coords.latitude);
          setLng(position.coords.longitude);
          localStorage.setItem(
            "userLatitude",
            JSON.stringify(position.coords.latitude)
          );
          localStorage.setItem(
            "userLongitude",
            JSON.stringify(position.coords.longitude)
          );
        },
        () => {
          setStatus("Unable to retrieve your location");
        }
      );
    }
  };
  const [location, setLocation] = useState({});
  const points = [
    {
      id: 1,
      title: "York, North Yorkshire",
      latitude: locations?.lat,
      longitude: locations?.lng,
      image: "/myMarker.png",
    },

    // {
    //   id: 2,
    //   title: "Worcester",
    //   latitude: 52.192001,
    //   longitude: -2.22,
    //   image: "/avatar2.png",
    // },
    // {
    //   id: 3,
    //   title: "Winchester, Hampshire, the UK",
    //   latitude: 51.063202,
    //   longitude: -1.308,
    //   image: "/avatar3.png",
    // },
    // {
    //   id: 4,
    //   title: "Wells, South West England, the UK",
    //   latitude: 51.209,
    //   longitude: -2.647,
    //   image: "/avatar4.png",
    // },
    // {
    //   id: 5,
    //   title: "Wakefield, West Yorkshire, the UK",
    //   latitude: 53.68,
    //   longitude: -1.308,
    //   image: "/avatar5.png",
    // },
    // {
    //   id: 6,
    //   title: "Truro, Cornwall, the UKK",
    //   latitude: 50.259998,
    //   longitude: -5.051,
    //   image: "/avatar1.png",
    // },
    // {
    //   id: 7,
    //   title: "Sunderland, North East, the UK",
    //   latitude: 54.906101,
    //   longitude: -1.38113,
    //   image: "/avatar2.png",
    // },
    // {
    //   id: 8,
    //   title: "Sheffield, South Yorkshire, the UK",
    //   latitude: 53.383331,
    //   longitude: -1.466667,
    //   image: "/avatar3.png",
    // },
    // {
    //   id: 9,
    //   title: "Salford, North West, the UK",
    //   latitude: 53.483002,
    //   longitude: -2.2931,
    //   image: "/avatar4.png",
    // },
    // {
    //   id: 10,
    //   title: "St. Davids, Wales, the UK",
    //   latitude: 51.882,
    //   longitude: -5.269,
    //   image: "/avatar5.png",
    // },
    // {
    //   id: 11,
    //   title: "St.Albans, Hertfordshire, the UK",
    //   latitude: 51.755001,
    //   longitude: -0.336,
    //   image: "/avatar1.png",
    // },
    // {
    //   id: 12,
    //   title: "Ripon, North Yorkshire, the UK",
    //   latitude: 54.138,
    //   longitude: -1.524,
    //   image: "/avatar2.png",
    // },
    // {
    //   id: 13,
    //   title: "Portsmouth, Hampshire, the UK",
    //   latitude: 50.805832,
    //   longitude: -1.087222,
    //   image: "/avatar3.png",
    // },
    // {
    //   id: 14,
    //   title: "Perth, Scotland, the UK",
    //   latitude: 56.396999,
    //   longitude: -3.437,
    //   image: "/avatar4.png",
    // },
    // {
    //   id: 15,
    //   title: "Nottingham, the UK",
    //   latitude: 52.950001,
    //   longitude: -1.15,
    //   image: "/avatar5.png",
    // },
    // {
    //   id: 16,
    //   title: "Newry, Northern Ireland, the UK",
    //   latitude: 54.175999,
    //   longitude: -6.349,
    //   image: "/avatar1.png",
    // },
    // {
    //   id: 17,
    //   title: "Newcastle Upon Tyne, the UK",
    //   latitude: 54.966667,
    //   longitude: -1.6,
    //   image: "/avatar2.png",
    // },
    // {
    //   id: 18,
    //   title: "Liverpool, Merseyside, the UK",
    //   latitude: 53.400002,
    //   longitude: -2.983333,
    //   image: "/avatar3.png",
    // },
    // {
    //   id: 19,
    //   title: "Lincoln, Lincolnshire, the UK",
    //   latitude: 53.234444,
    //   longitude: -0.538611,
    //   image: "/avatar4.png",
    // },
    // {
    //   id: 20,
    //   title: "Lichfield, Staffordshire, the UK",
    //   latitude: 52.683498,
    //   longitude: -1.82653,
    //   image: "/avatar5.png",
    // },
  ];

  const filterMapData = points?.map((item) => item);
  //console.log("Filter Map Data", filterMapData);
  const finalData = filterMapData?.map((item, indx) => {
    return item;
  });
  //console.log("Final Data", finalData);

  return (
    <div className="App">
      <GoogleMapReact
        bootstrapURLKeys={{
          // remove the key if you want to fork
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
