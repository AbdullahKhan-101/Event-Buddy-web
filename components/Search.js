import { LocationMarkerIcon, SearchIcon } from "@heroicons/react/outline";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import SendIcon from "@mui/icons-material/Send";
import { Avatar } from "@mui/material";
import Map from "./Map/Map";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import Script from "next/script";
import {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng,
  PlacesAutocomplete,
} from "react-places-autocomplete";
const Search = () => {
  const router = useRouter();
  const [location, setLocation] = useState({});
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [status, setStatus] = useState(null);
  useEffect(() => {
    getLocation();
  }, [lat]);
  // useEffect(() => {
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
          // router.push("/search");
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
      getLocation();
      router.reload("/search");
    }
  };
  // getLocation();
  // }, []);
  // console.log("==============>", location);
  return (
    <div className="mx-auto max-w-[100vw]">
      {/* <Script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places"></Script> */}
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
            <GooglePlacesAutocomplete
              apiKey="AIzaSyDh0f846bnmUxgSw6n5XtIZb01xtprxQfs"
              // apiOptions={{ language: "en", region: "es" }}
            />
            {/* <PlacesAutocomplete></PlacesAutocomplete> */}
          </div>
          {/* <input
            type="text"
            placeholder="Search Location"
            className="flex-grow outline-none text-[#42526E] opacity-70 font-normall"
          /> */}
        </div>
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
        <Map />
        {/* <div className="relative bg-white rounded-tl-[20px] hidden md:block float-right h-[100vh]  xl:w-9/12 md:w-8/12">
          <Image src="/map.png" alt="infoImg" layout="fill" objectfit="cover" />
        </div>
        <div className="relative md:hidden float-right h-[75vh]  w-[100vw]">
          <Image
            src="/smallmap.png"
            alt="infoImg"
            layout="fill"
            objectfit="cover"
          />
        </div>
        <div className="absolute z-10 md:top-20 top-5 md:left-1/3 left-56">
          <img src="/avatar1.png" />
        </div>
        <div className="absolute z-10 top-20 md:right-60 right-56">
          <img src="/avatar2.png" />
        </div>
        <div className="absolute z-10 md:top-6 top-72 left-2/4">
          <img src="/avatar3.png" />
        </div>
        <div className="absolute z-10 md:top-60 top-36 left-2/4">
          <img src="/avatar4.png" />
        </div> */}
        {/* <div className="absolute z-10 md:top-96 top-80 left-1/3 md:left-2/3">
          <div className="relative w-[70px] cursor-pointer mr-3 h-[70px]  text-[#E9813B] ">
            <Image
              src="/send1.png"
              alt="infoImg"
              layout="fill"
              objectfit="contain"
            />
          </div>
        </div>
        <div className="absolute z-10 md:right-72 md:top-72 top-56 right-48">
          <img src="/avatar5.png" />
        </div> */}
      </div>

      {/* <button
        onClick={() => router.push("/home")}
        className="fixed z-10 px-4 py-2 font-semibold uppercase bg-gray-200 rounded-lg lg:right-12 lg:bottom-8 hover:bg-gray-300 right-2 bottom-1"
      >
        Next
      </button> */}
    </div>
    // <GooglePlacesAutocomplete
    //   apiKey="AIzaSyDh0f846bnmUxgSw6n5XtIZb01xtprxQfs"
    //   // apiOptions={{ language: "en", region: "es" }}
    // />
  );
};

// const PlacesAutocomplete = () => {
//   const {
//     ready,
//     value,
//     suggestions: { status, data },
//     setValue,
//   } = usePlacesAutocomplete();

//   const handleSelect = async (val) => {
//     setValue(val, false);
//     clearSuggestions();

//     const result = await getGeocode({ val });
//     const { lat, lng } = await getLatLng(result[0]);
//     setSelected({ lat, lng });
//   };

//   return (
//     <Combobox onSelect={handleSelect}>
//       <ComboboxInput
//         value={value}
//         onChange={(e) => setValue(e.target.value)}
//         disabled={!ready}
//         className="flex-grow-0 h-12 rounded-md border-2 border-gray-500 w-[300px] px-2 flex items-center py-2 font-normall text-lg z-10"
//         placeholder="Search an address"
//       />
//       <ComboboxPopover>
//         <ComboboxList>
//           {status === "OK" &&
//             data.map(({ place_id, description }) => (
//               <ComboboxOption key={place_id} value={description} />
//             ))}
//         </ComboboxList>
//       </ComboboxPopover>
//     </Combobox>
//   );
// };

// return (
//   <div className="mx-auto max-w-[100vw]">
//     <div className="fixed bottom-0 bg-white z-10 shadow-[0_4px_60px_0px_rgba(0,0,0,0.25)] rounded-tr-[20px] rounded-tl-[20px] w-[100vw] p-5 md:top-0 xl:w-3/12 md:w-4/12">
//       <div className="flex items-center justify-between ">
//         <h1 className="text-xl font-strongg text-[#0E134F]">
//           {" "}
//           Your Location
//         </h1>
//         <h4
//           onClick={() => router.push("/enableLocation")}
//           className="text-[#E9813B] cursor-pointer"
//         >
//           Skip
//         </h4>
//       </div>
//       <div className="p-3 border rounded-md max-w-[400px] flex items-center mt-4">
//         <SearchIcon className="w-5 h-5 mr-2 text-[#E9813B]" />
//         <input
//           type="text"
//           placeholder="Search Location"
//           className="flex-grow outline-none text-[#42526E] opacity-70 font-normall"
//         />
//       </div>
//       <p className="flex items-center mx-1 mt-4 mb-2 cursor- pointer md:mt-6">
//         <div className="relative w-[28px] mr-3 h-[28px]  text-[#E9813B] ">
//           <Image
//             src="/send.png"
//             alt="infoImg"
//             layout="fill"
//             objectFit="contain"
//           />
//         </div>
//         <span className="text-[#42526E] font-normall font-[16px] cursor-pointer">
//           Use Your Current Location
//         </span>
//       </p>
//     </div>
//     <div className="relative">
//       <div className="relative bg-white rounded-tl-[20px] hidden md:block float-right h-[100vh]  xl:w-9/12 md:w-8/12">
//         <Image src="/map.png" alt="infoImg" layout="fill" objectFit="cover" />
//       </div>
//       <div className="relative md:hidden float-right h-[75vh]  w-[100vw]">
//         <Image
//           src="/smallmap.png"
//           alt="infoImg"
//           layout="fill"
//           objectFit="cover"
//         />
//       </div>
//       <div className="absolute z-10 md:top-20 top-5 md:left-1/3 left-56">
//         <img src="/avatar1.png" />
//       </div>
//       <div className="absolute z-10 top-20 md:right-60 right-56">
//         <img src="/avatar2.png" />
//       </div>
//       <div className="absolute z-10 md:top-6 top-72 left-2/4">
//         <img src="/avatar3.png" />
//       </div>
//       <div className="absolute z-10 md:top-60 top-36 left-2/4">
//         <img src="/avatar4.png" />
//       </div>
//       <div className="absolute z-10 md:top-96 top-80 left-1/3 md:left-2/3">
//         <div className="relative w-[70px] cursor-pointer mr-3 h-[70px]  text-[#E9813B] ">
//           <Image
//             src="/send1.png"
//             alt="infoImg"
//             layout="fill"
//             objectFit="contain"
//           />
//         </div>
//       </div>
//       <div className="absolute z-10 md:right-72 md:top-72 top-56 right-48">
//         <img src="/avatar5.png" />
//       </div>
//     </div>

//     <button
//       onClick={() => router.push("/home")}
//       className="fixed z-10 px-4 py-2 font-semibold uppercase bg-gray-200 rounded-lg lg:right-12 lg:bottom-8 hover:bg-gray-300 right-2 bottom-1"
//     >
//       Next
//     </button>
//   </div>
// );

export default Search;
