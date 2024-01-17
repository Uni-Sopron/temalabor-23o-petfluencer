import React, { useEffect, useState } from "react";
import LeftSide from "../LeftSidebar/LeftSide";
import RightSide from "../RightSidebar/RightSide";
import Navbar from "../Navbar/Navbar";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../Config/firebase";
import profilePic from "./../../assets/animal.jpg";
import { Avatar } from "@material-tailwind/react";
import avatar from "./../../assets/avatar.png";
import { useParams } from "react-router-dom";

const FriendProfile = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const getUserProfile = async () => {
      const q = query(collection(db, "users"), where("uid", "==", id));
      onSnapshot(q, (doc) => {
        setProfile(doc.docs[0].data());
      });
    };
    getUserProfile();
  }, [id]);

  return (
    <div className="w-full">
      <div className="fixed top-0 z-10 w-full bg-white">
        <Navbar></Navbar>
      </div>
      <div className="flex bg-gray-100">
        <div className="flex-auto w-[20%] fixed top-12">
          <LeftSide></LeftSide>
        </div>
        <div className="flex-auto w-[60%] absolute left-[20%] top-14 bg-gray-100 rounded-x]">
          <div className="w-[80%] mx-auto">
            <div>
              <div className="relative py-4">
                <img
                  className="h-98 w-full rounded-md"
                  src={profilePic}
                  alt="profilePic"
                ></img>
              </div>
              <div className="absolute bottom-10 left-6">
                <Avatar
                  size="sm"
                  src={profile?.image || avatar}
                  alt="avatar"
                  variant="circular"
                ></Avatar>
                <p className="py-2 font-roboto font-medium text-sm text-black no-underline tracking-normal leading-none">
                  {profile?.email}
                </p>
                <p className="py-2 font-roboto font-medium text-sm text-black no-underline tracking-normal leading-none">
                  {profile?.name}
                </p>
              </div>
            </div>
            <div className="flex flex-col absolute right-6 bottom-10">
              <div className="flex items-center">
                <span className="ml-2 py-2 font-roboto font-medium text-sm text-black no-underline tracking-normal leading-none">
                  From Hungary
                </span>
              </div>
              <div className="flex items-center">
                <span className="ml-2 py-2 font-roboto font-medium text-sm text-black no-underline tracking-normal leading-none">
                  Lives in Sopron
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-auto w-[20%] fixed right-0 top-12">
          <RightSide></RightSide>
        </div>
      </div>
    </div>
  );
};

export default FriendProfile;
