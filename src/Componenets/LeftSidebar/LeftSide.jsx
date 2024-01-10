import React, { useRef, useState, useEffect, useContext } from "react";
import { Tooltip } from "@material-tailwind/react";
import { Avatar } from "@material-tailwind/react";
import animal from "../../assets/animal.jpg";
import avatar from "../../assets/avatar.png";
import facebook from "../../assets/facebook.png";
import twitter from "../../assets/twitter.png";
import laptop from "../../assets/laptop.jpg";
import media from "../../assets/media.jpg";
import apps from "../../assets/apps.jpg";
import dogmarket from "../../assets/dogmarket.png";
import { AuthContext } from "../AppContext/AppContext";
import { collection, setDoc } from "firebase/firestore";
import { db } from "../Firebase/firebase";
import { HANDLE_ERROR } from "../AppContext/PostReducer";
import { collectionUsersRef } from "../AppContext/AppContext";
import { getDocs, query, where } from "firebase/firestore";
import { updateDoc } from "firebase/firestore";

const LeftSide = () => {
  const [data, setData] = useState([]);
  const count = useRef(0);
  const { user, userData } = useContext(AuthContext);
  const [kind, setKind] = useState("");
  const [species, setSpecies] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [habitat, setHabitat] = useState("");
  const [description, setDescription] = useState("");

  const handleRandom = (arr) => {
    setData(arr[Math.floor(Math.random() * arr?.length)]);
  };

  useEffect(() => {
    const imageList = [
      {
        id: "1",
        image: laptop,
      },
      {
        id: "2",
        image: media,
      },
      {
        id: "3",
        image: apps,
      },
      {
        id: "4",
        image: dogmarket,
      },
    ];
    handleRandom(imageList);
    let countAds = 0;
    let startAds = setInterval(() => {
      countAds++;
      handleRandom(imageList);
      count.current = countAds;
      if (countAds === 5) {
        clearInterval(startAds);
      }
    }, 2000);

    return () => {
      clearInterval(startAds);
    };
  }, []);

  const progressBar = () => {
    switch (count.current) {
      case 1:
        return 20;
      case 2:
        return 40;
      case 3:
        return 60;
      case 4:
        return 80;
      case 5:
        return 100;
      default:
        return 0;
    }
  };

  const addData = async (e) => {
    e.preventDefault();
  
    const collectionUsersRef = collection(db, "users");
    const q = query(collectionUsersRef, where("uid", "==", user.uid));
  
    try {
      const querySnapshot = await getDocs(q);
  
      // Check if there is a document with the specified UID
      if (querySnapshot.size > 0) {
        const userDocRef = querySnapshot.docs[0].ref;
  
        // Check if all fields are not empty before updating the document
        if (kind !== "" && species !== "" && dateOfBirth !== "" && habitat !== "" && description !== "") {
          // Update the document with the new data
          await updateDoc(userDocRef, {
            kind: kind,
            species: species,
            dateOfBirth: dateOfBirth,
            habitat: habitat,
            description: description,
            // Add other fields if needed
          });
  
          // Clear the form inputs
          setKind("");
          setSpecies("");
          setDateOfBirth("");
          setHabitat("");
          setDescription("");
  
          console.log("Data updated successfully!");
        } else {
          throw new Error("All fields must be filled");
        }
      } else {
        // Handle the case where no document is found with the specified UID
        console.log("User not found");
      }
    } catch (err) {
      alert(err.message);
      console.error(err.message);
    }
  };
  

  return (
    <div className="flex flex-col h-screen bg-white pb-4 border-2 rounded-r-xl shadow-1g">
      <div className="flex flex-col items-center relative">
        <img
          className="h-40 w-full rounded-r-x1"
          src={animal}
          alt="animal"
        ></img>
        <div className="absolute -bottom-4">
          <Tooltip content="Profile" placement="top">
            <Avatar
              size="md"
              src={user?.photoURL || avatar}
              alt="avatar"
            ></Avatar>
          </Tooltip>
        </div>
      </div>

      <div className="flex flex-col items-center pt-6">
        <p className="font-roboto font-medium text-md text-gray-700 no-underline tracking-normal leading-none">
          {user?.displayName || userData?.displayName}
        </p>
      </div>
      <div className="flex flex-col items-center pt-2">
        <input
          className="w-full rounded-2x1 outline-none border-0 p-2 bg-gray-100"
          name="kind"
          value={kind}
          onChange={(e) => setKind(e.target.value)}
          placeholder={user?.kind || userData?.kind}
          type="name"
        ></input>
      </div>
      <div className="flex flex-col items-center pt-2">
        <input
          className="w-full rounded-2x1 outline-none border-0 p-2 bg-gray-100"
          name="species"
          value={species}
          onChange={(e) => setSpecies(e.target.value)}
          placeholder={user?.species || userData?.species}
          type="name"
        ></input>
      </div>
      <div className="flex flex-col items-center pt-2">
        <input
          className="w-full rounded-2x1 outline-none border-0 p-2 bg-gray-100"
          name="dateOfBirth"
          value={dateOfBirth}
          onChange={(e) => setDateOfBirth(e.target.value)}
          placeholder={user?.dateOfBirth || userData?.dateOfBirth}
          type="text"
        ></input>
      </div>
      <div className="flex flex-col items-center pt-2">
        <input
          className="w-full rounded-2x1 outline-none border-0 p-2 bg-gray-100"
          name="habitat"
          value={habitat}
          onChange={(e) => setHabitat(e.target.value)}
          placeholder={user?.habitat || userData?.habitat}
          type="name"
        ></input>
      </div>
      <div className="flex flex-col items-center pt-2">
        <input
          className="w-full rounded-2x1 outline-none border-0 p-2 bg-gray-100"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder={user?.description || userData?.description}
          type="text"
        ></input>
      </div>

      <button className="asd" type="submit" onClick={addData}>
        Submit
      </button>

      <div className="flex flex-col">
        <div className="flex items-center pb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6 mx-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z"
            />
          </svg>

          <p className="font-roboto font-bold text-1g no-underline tracking-normal leading-none">
            Hungary
          </p>
        </div>
      </div>

      <div className="flex flex-col">
        <div className="flex items-center pb-4 flex">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6 mx-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z"
            />
          </svg>

          <p className="font-roboto font-bold text-1g no-underline tracking-normal leading-none">
            React Developer
          </p>
        </div>
      </div>
      <div className="ml-2">
        <p className="font-roboto font-bold text-lg no-underline tracking-normal leading-none py-2">
          Social Profiles
        </p>
        <div className="flex items-center">
          <img className="h-10 mb-3 mr-2" src={facebook} alt="facebook"></img>
          <p className="font-roboto font-bold text-lg text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-black no-underline tracking-normal leading-none py-2">
            Facebook
          </p>
        </div>
        <div className="flex items-center">
          <img className="h-10 mb-3 mr-2" src={twitter} alt="twitteer"></img>
          <p className="font-roboto font-bold text-lg text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-black no-underline tracking-normal leading-none py-2">
            Twitter
          </p>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center pt-4">
        <p className="font-roboto font-bold text-lg no-underline tracking-normal leading-none py-2">
          Random Ads
        </p>
        <div
          style={{ width: `${progressBar()}%` }}
          className="bg-green-600 rounded-xl h-1 mb-4"
        ></div>
        <img className="h-36 rounded-lg" src={data.image} alt="ads"></img>
      </div>
    </div>
  );
};

export default LeftSide;
