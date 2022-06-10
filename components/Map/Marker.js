import React from "react";
import { usersDataModal } from "../../atoms/modalAtom";
import { useRecoilState } from "recoil";
import { useRouter } from "next/router";
const MyMarker = ({ image, item }) => {
  // console.log("------------>", item);
  const [usersData, setUsersData] = useRecoilState(usersDataModal);
  const router = useRouter();
  return (
    <div
      style={{
        display: "flex",
        height: "8rem",
        width: "8rem",
        justifyContent: "center",
        transform: "translate(-50%, -50%)",
      }}
      onClick={() => {
        setUsersData({ from: "Home", Id: item });
        router.push("/person");
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
            height: 40,
            width: 40,
            borderRadius: "30px",
            // position: "absolute",
            marginTop: "3px",
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
