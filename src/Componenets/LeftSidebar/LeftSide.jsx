import React, { useState, useContext } from "react";
import { Tooltip } from "@material-tailwind/react";
import { Avatar } from "@material-tailwind/react";
import animal from "../../assets/animal.jpg";
import avatar from "../../assets/avatar.png";
import facebook from "../../assets/facebook.png";
import twitter from "../../assets/twitter.png";
import { AuthContext } from "../AppContext/AppContext";
import { collection, } from "firebase/firestore";
import { db } from "../Firebase/firebase";
import { getDocs, query, where } from "firebase/firestore";
import { updateDoc } from "firebase/firestore";

const LeftSide = () => {
  const { user, userData } = useContext(AuthContext);
  const [kind, setKind] = useState("");
  const [species, setSpecies] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [habitat, setHabitat] = useState("");
  const [description, setDescription] = useState("");


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

      <div className="ml-20 mt-5">
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

    </div>
  );
};

export default LeftSide;
