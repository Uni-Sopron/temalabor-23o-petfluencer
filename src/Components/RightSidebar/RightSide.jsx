import React, { useState, useContext } from "react";
import waterslide from "../../assets/waterslide.jpg";
import { AuthContext } from "../AppContext/AppContext";
import { Link } from "react-router-dom";
import remove from "../../assets/delete.png";
import {
  collection,
  doc,
  query,
  where,
  getDocs,
  arrayRemove,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../Config/firebase";

const RightSide = () => {
  const [input, setInput] = useState("");
  const { user, userData } = useContext(AuthContext);
  const friendList = userData?.friends;
  const [startIndex, setStartIndex] = useState(0);

  const searchFriends = (data) => {
    return data.filter((item) =>
      item["name"].toLowerCase().includes(input.toLowerCase())
    );
  };

  const removeFriend = async (id, name, image) => {
    const q = query(collection(db, "users"), where("uid", "==", user?.uid));
    const getDoc = await getDocs(q);
    const userDocumentId = getDoc.docs[0].id;

    await updateDoc(doc(db, "users", userDocumentId), {
      friends: arrayRemove({ id: id, name: name }),
    });
  };

  const handleScroll = (direction) => {
    const step = 1; // Number of friends to display at a time
    const maxVisibleFriends = 4;
  
    if (direction === "up" && startIndex > 0) {
      setStartIndex((prevIndex) => Math.max(0, prevIndex - step));
    } else if (direction === "down" && startIndex + step + maxVisibleFriends <= friendList?.length) {
      setStartIndex((prevIndex) => Math.min(friendList?.length - maxVisibleFriends, prevIndex + step));
    }
  };

  


  return (
    <div className="flex flex-col h-screen bg-white shadow-lg border-2 rounded-l-xl">
      <div className="flex flex-col items-center relative pt-10">
        <img className="h-48 rounded-md" src={waterslide} alt="nature"></img>
      </div>
      <p className="font-roboto font-normal text-sm text-gray-700 max-w-fit no-underline tracking-normal leading-tight py-2 mx-2">
        Through photography, the beauty of Mother Nature can be frozen in time.
        This category celebrates the magic of our planet and beyond — from the
        immensity of the great outdoors, to miraculous moments in your own
        backyard.
      </p>
      <div className="mx-2 mt-10 max-h-96 overflow-hidden relative">
        <p className="font-roboto font-medium text-sm text-gray-700 no-underline tracking-normal leading-none">
          Friends:{" "}
        </p>
        <input
          className="border-0 outline-none mt-4"
          name="input"
          value={input}
          type="text"
          placeholder="Search friends"
          onChange={(e) => setInput(e.target.value)}
        ></input>
        <div className="flex flex-col items-start">
          {friendList?.length > 0 ? (
            searchFriends(friendList)?.slice(startIndex, startIndex + 4).map((friend, index) => {
              return (
                <div
                  className="flex items-center justify-between hover:bg-gray-100 duration-300 ease-in-out"
                  key={friend.id}
                >
                <Link to={`/profile/${friend.id}`}>
                  <div className="flex items-center my-2 cursor-pointer">
                    <div className="flex items-center">
                      <p className="ml-4 font-roboto font-medium text-sm text-gray-700 no-underline tracking-normal leading-none">
                        {friend.name}
                      </p>
                    </div>
                  </div>
                </Link>
                <div className="mr-4">
                  <img
                    onClick={() =>
                      removeFriend(friend.id, friend.name, friend.image)
                    }
                    className="cursor-pointer h-[30px]"
                    src={remove}
                    alt="deleteFriend"
                  ></img>
                </div>
                </div>
              );
            })
          ) : (
            <p className="mt-10 font-roboto font-medium text-sm text-gray-700 no-underline tracking-normal leading-none">
              Add friends to check their profile
            </p>
          )}
        </div>
        <div className="mt-8 flex justify-center items-center space-x-4">
          <button
            onClick={() => handleScroll("up")}
            className="bg-gray-400 text-white rounded-full p-2"
          >
            Up
          </button>
          <button
            onClick={() => handleScroll("down")}
            className="bg-gray-400 text-white rounded-full p-2"
          >
            Down
          </button>
        </div>
      </div>
    </div>
  );
};

export default RightSide;