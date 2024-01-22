import React, { useEffect, useState, useContext } from "react";
import LeftSide from "../LeftSidebar/LeftSide";
import RightSide from "../RightSidebar/RightSide";
import Navbar from "../Navbar/Navbar";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../Config/firebase";
import profilePic from "./../../assets/animal.jpg";
import { Avatar } from "@material-tailwind/react";
import avatar from "./../../assets/avatar.png";
import { useParams } from "react-router-dom";
import { AuthContext } from '../AppContext/AppContext';

const FriendProfile = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const { user, userData } = useContext(AuthContext);

  useEffect(() => {
    const getUserProfile = async () => {
      const q = query(collection(db, "users"), where("uid", "==", id));
      onSnapshot(q, (doc) => {
        setProfile(doc?.docs[0]?.data());
      });
    };
    getUserProfile();
  }, [id]);

  return (
    <div className="w-full">
      <div className="sticky z-10 w-full bg-white">
        <Navbar></Navbar>
      </div>
      <div className="grid bg-gray-100 md:grid-cols-4 grid-cols-1">
        <div className="">
          <LeftSide></LeftSide>
        </div>
        <div className="flex col-span-2">
          <div className="mt-4 ml-4">
          <div className="flex align-center gap-2">
            <Avatar
            size="sm"
            src={profile?.image || avatar}
            alt="avatar"
            variant="circular"
          ></Avatar>
          <p className="py-2 font-roboto font-medium text-sm text-black no-underline tracking-normal leading-none">
            {profile?.name}
          </p>
          </div>
          <p className="py-2 font-roboto font-medium text-sm text-black no-underline tracking-normal leading-none">
            {profile?.kind}
          </p>
          <p className="py-2 font-roboto font-medium text-sm text-black no-underline tracking-normal leading-none">
            {profile?.species}
          </p>
          <p className="py-2 font-roboto font-medium text-sm text-black no-underline tracking-normal leading-none">
            {profile?.dateOfBirth}
          </p>
          <p className="py-2 font-roboto font-medium text-sm text-black no-underline tracking-normal leading-none">
            {profile?.habitat}
          </p>
          <p className="py-2 font-roboto font-medium text-sm text-black no-underline tracking-normal leading-none">
            {profile?.description}
          </p>
          <p className="py-2 font-roboto font-medium text-sm text-blue-300 tracking-normal leading-none">
            <a href={`mailto:${profile?.email}`} className="hover:underline">{profile?.email}</a>
          </p>
          
          </div>
          </div>
        <div className="">
          <RightSide></RightSide>
        </div>
      </div>
    </div>
  );
};

export default FriendProfile;
