import { SearchIcon } from "@heroicons/react/outline";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Map from "./Map/Map";
import GooglePlaces from "./Map/GoogePlaces";
import ClipLoader from "react-spinners/ClipLoader";
import Geocode from "react-geocode";
import axios from "axios";
const Search = () => {
  const router = useRouter();
  const [location, setLocation] = useState({});
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [status, setStatus] = useState(null);
  const [placesOpen, setPlacesOpen] = useState(false);
  const [add, setAdd] = useState("");
  const [openSL, setOpenSL] = useState(false);
  useEffect(() => {
    getLocation();
  }, [lat]);
  useEffect(() => {
    setTimeout(() => {
      setPlacesOpen(true);
    }, 5000);
  }, []);
  const getLocation = async () => {
    const Latitude = await localStorage.getItem("userLatitude");
    const userLatitude = JSON.parse(Latitude);
    const Longitude = await localStorage.getItem("userLongitude");
    const userLongitude = JSON.parse(Longitude);
    setLocation({
      lng: userLongitude,
      lat: userLatitude,
    });
  };
  const useCurrentLocation = () => {
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
          setLocationApi({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        () => {
          setStatus("Unable to retrieve your location");
        }
      );
      getLocation();
    }
  };
  const getAddress = async (e) => {
    Geocode.setApiKey("AIzaSyDh0f846bnmUxgSw6n5XtIZb01xtprxQfs");
    Geocode.setLanguage("en");
    Geocode.setRegion("es");
    Geocode.setLocationType("ROOFTOP");
    Geocode.enableDebug();
    Geocode.fromAddress(e.label).then(
      (res) => {
        // const address = res.results[0].formatted_address;
        const lat = res.results[0].geometry.location.lat;
        const lng = res.results[0].geometry.location.lng;
        setLocation({
          lng: lng,
          lat: lat,
        });
        setOpenSL(true);
        // setEventAddress(address);
        // setEventLat(lat);
        // setEventLng(lng);
        console.error("--------->", res);
      },
      (error) => {
        // console.error("--------->", error);
      }
    );
  };
  const setLocationApi = async (data) => {
    console.log("data aya aya ya ", data);
    const JWT = localStorage.getItem("JWTEventBuddy");

    const params = new URLSearchParams();
    params.append("Lat", data.lat);
    params.append("Lng", data.lng);

    try {
      let fata = await axios.put("http://54.144.168.52:3000/user", params, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          authorization: JWT,
        },
      });
      console.log(fata, "user setting api image");
      if (fata?.data?.Data?.Message == "Updated") {
        localStorage.setItem(
          "user",
          JSON.stringify({
            user: fata?.data?.Data?.User,
          })
        );
        localStorage.setItem("userLatitude", JSON.stringify(data.lat));
        localStorage.setItem("userLongitude", JSON.stringify(data.lng));
        router.push("/home");
      }
    } catch (error) {}
  };
  return (
    <div className="mx-auto max-w-[100vw]">
      <div className="fixed bottom-0 bg-white z-10 shadow-[0_4px_60px_0px_rgba(0,0,0,0.25)] rounded-tr-[20px] rounded-tl-[20px] w-[100vw] p-5 md:top-0 xl:w-3/12 md:w-4/12">
        <div className="flex items-center justify-between ">
          <h1 className="text-xl font-strongg text-[#0E134F]">
            {" "}
            Your Location
          </h1>
          <h4
            onClick={() => router.push("/enableLocation")}
            className="text-[#E9813B] cursor-pointer"
          >
            Skip
          </h4>
        </div>
        <div className="p-3 border rounded-md max-w-[400px] flex items-center mt-4">
          <SearchIcon className="w-5 h-5 mr-2 text-[#E9813B]" />

          <div style={{ width: "50vh" }}>
            <GooglePlaces
              value={add}
              onChange={(e) => {
                setAdd(e);
                getAddress(e);
              }}
              selectProps={{
                styles: { color: "red" },
              }}
              placeholder="Search Location"
            />
          </div>
        </div>
        {openSL && (
          <>
            {" "}
            <p className="flex items-center mx-1 mt-4 mb-2 cursor- pointer md:mt-6">
              <div className="relative w-[28px] mr-3 h-[28px]  text-[#E9813B] ">
                <Image
                  src="/send.png"
                  alt="infoImg"
                  layout="fill"
                  objectfit="contain"
                />
              </div>

              <span
                className="text-[#42526E] font-normall font-[16px] cursor-pointer"
                onClick={() => setLocationApi(location)}
              >
                Save Location
              </span>
            </p>
            <p className="flex items-center mx-1 mt-4 mb-2 cursor- pointer md:mt-6">
              <span
                className="text-[#42526E] font-normall font-[16px] cursor-pointer"
                onClick={useCurrentLocation}
              >
                OR
              </span>
            </p>
          </>
        )}
        <p className="flex items-center mx-1 mt-4 mb-2 cursor- pointer md:mt-6">
          <div className="relative w-[28px] mr-3 h-[28px]  text-[#E9813B] ">
            <Image
              src="/send.png"
              alt="infoImg"
              layout="fill"
              objectfit="contain"
            />
          </div>

          <span
            className="text-[#42526E] font-normall font-[16px] cursor-pointer"
            onClick={useCurrentLocation}
          >
            Use Your Current Location
          </span>
        </p>
      </div>
      <div className="relative">
        {placesOpen ? (
          <Map locations={location} />
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              height: "100vh",
              width: "80vw",
              alignItems: "center",
              marginLeft: "350px",
            }}
          >
            <ClipLoader color="#ED974B" loading={true} size={50} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
