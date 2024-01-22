import React, { useState, useContext } from "react";
import { Tooltip } from "@material-tailwind/react";
import { Avatar } from "@material-tailwind/react";
import animal from "../../assets/animal.jpg";
import avatar from "../../assets/avatar.png";
import facebook from "../../assets/facebook.png";
import twitter from "../../assets/twitter.png";
import { AuthContext } from "../AppContext/AppContext";
import { collection } from "firebase/firestore";
import { db } from "../../Config/firebase";
import { getDocs, query, where } from "firebase/firestore";
import { updateDoc } from "firebase/firestore";

const LeftSide = () => {
  const { user, userData, attributes } = useContext(AuthContext);
  const [formFields, setFormFields] = useState(
    attributes.reduce((acc, attribute) => {
      acc[attribute] = userData?.[attribute] || "";
      return acc;
    }, {})
  );

  const handleInputChange = (e, attribute) => {
    setFormFields((prevFields) => ({
      ...prevFields,
      [attribute]: e.target.value,
    }));
  };

  const addData = async (e) => {
    e.preventDefault();

    const collectionUsersRef = collection(db, "users");
    const q = query(collectionUsersRef, where("uid", "==", user.uid));

    try {
      const querySnapshot = await getDocs(q);

      if (querySnapshot.size > 0) {
        const userDocRef = querySnapshot.docs[0].ref;

        const updatedData = Object.entries(formFields).reduce(
          (acc, [key, value]) => {
            acc[key] = value;
            return acc;
          },
          {}
        );

        await updateDoc(userDocRef, updatedData);

        setFormFields(
          attributes.reduce((acc, attribute) => {
            acc[attribute] = "";
            return acc;
          }, {})
        );

        console.log("Data updated successfully!");
      } else {
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

      {attributes.map((attribute) => (
        <div className="flex flex-col items-center pt-2" key={attribute}>
          <input
            className="w-full rounded-2x1 outline-none border-0 p-2 bg-gray-100"
            name={attribute}
            value={formFields[attribute]}
            onChange={(e) => handleInputChange(e, attribute)}
            placeholder={userData?.[attribute]}
            type="text"
          />
        </div>
      ))}
      <div className="flex flex-col items-center pt-4">
        <button className="asd" type="submit" onClick={addData}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default LeftSide;
