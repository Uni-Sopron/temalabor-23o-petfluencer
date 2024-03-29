import React, { useContext, useEffect, useReducer, useState } from "react";
import { Avatar } from "@material-tailwind/react";
import avatar from "./../../assets/avatar.png";
import like from "./../../assets/like.png";
import comment from "./../../assets/comment.png";
import remove from "./../../assets/delete.png";
import addFriend from "./../../assets/addfriend.png";
import { AuthContext } from "../AppContext/AppContext";
import {
  PostReducer,
  postActions,
  postsStates,
} from "../AppContext/PostReducer";
import {
  doc,
  collection,
  setDoc,
  query,
  onSnapshot,
  where,
  updateDoc,
  arrayUnion,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
import { db, storage } from "../../Config/firebase";
import CommentSection from "./CommentSection";
import { ref, getDownloadURL } from "firebase/storage";

const PostCard = ({ uid, id, name, email, text, image, timestamp }) => {
  const [logo, setLogo] = useState();
  const { user, userData } = useContext(AuthContext);
  const [state, dispatch] = useReducer(PostReducer, postsStates);
  const likesRef = doc(collection(db, "posts", id, "likes"));
  const likesCollection = collection(db, "posts", id, "likes");
  const { ADD_LIKE, HANDLE_ERROR } = postActions;
  const [open, setOpen] = useState(false);
  const singlePostDocument = doc(db, "posts", id);
  const isUidInFriendList =
    Array.isArray(userData?.friends) &&
    userData.friends.some((friend) => friend.id === uid);

  useEffect(() => {
    //get user profile picture from firebase storage
    const getUserProfile = async () => {
      try {
        const storageRef = ref(storage, `profilePictures/${uid}`);
        const downloadURL = await getDownloadURL(storageRef);
        if (downloadURL) {
          setLogo(downloadURL);
        }
      } catch (err) {
      }
    };
    getUserProfile();
  }, []);

  const handleOpen = (e) => {
    e.preventDefault();
    setOpen(true);
  };

  const addUser = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].ref;
      await updateDoc(data, {
        friends: arrayUnion({
          id: uid,
          name: name,
        }),
      });
    } catch (err) {
      alert(err.message);
      console.log(err.message);
    }
  };

  const handleLike = async (e) => {
    e.preventDefault();
    const q = query(likesCollection, where("id", "==", user?.uid));
    const querySnapshot = await getDocs(q);
    const likesDocId = querySnapshot?.docs[0]?.id;
    try {
      if (likesDocId !== undefined) {
        const deleteId = doc(db, "posts", id, "likes", likesDocId);
        await deleteDoc(deleteId);
      } else {
        await setDoc(likesRef, {
          id: user?.uid,
        });
      }
    } catch (err) {
      alert(err.message);
      console.log(err.message);
    }
  };

  const deletePost = async (e) => {
    e.preventDefault();
    try {
      if (user?.uid === uid) {
        await deleteDoc(singlePostDocument);
      } else {
        alert("You can't delete other user's post!");
      }
    } catch (err) {
      alert(err.message);
      console.log(err.message);
    }
  };

  const extractHashtags = (text) => {
    const regex = /#\w+/g;
    return text.match(regex) || [];
  };

  const renderTextWithHashtags = () => {
    const hashtags = extractHashtags(text);

    if (hashtags.length === 0) {
      return (
        <p className="ml-4 pb-4 font-roboto font-medium text-sm text-gray-700 no-underline tracking-normal leading-none">
          {text}
        </p>
      );
    }

    let textWithHashtags = text;

    hashtags.forEach((hashtag) => {
      const parts = textWithHashtags.split(hashtag);
      textWithHashtags = (
        <>
          {parts[0]}
          <span
            key={hashtag}
            className="text-blue-500 font-bold cursor-pointer"
            onClick={() => handleHashtagClick(hashtag)}
          >
            {hashtag}
          </span>
          {parts.slice(1).join(hashtag)}
        </>
      );
    });

    return (
      <div className="ml-4 pb-4 font-roboto font-medium text-sm text-gray-700 no-underline tracking-normal leading-none">
        {textWithHashtags}
      </div>
    );
  };

  const handleHashtagClick = (hashtag) => {
    console.log(`Clicked on hashtag: ${hashtag}`);
  };

  useEffect(() => {
    const getLikes = async () => {
      try {
        const q = collection(db, "posts", id, "likes");
        onSnapshot(q, (doc) => {
          dispatch({
            type: ADD_LIKE,
            likes: doc.docs.map((item) => item.data()),
          });
        });
      } catch (err) {
        dispatch({
          type: HANDLE_ERROR,
        });
        alert(err.message);
        console.log(err.message);
      }
    };
    return () => getLikes();
  }, [id, ADD_LIKE, HANDLE_ERROR]);

  return (
    <div className="mb-4">
      <div className="flex flex-col py-4 bg-white rounded-t-3x1">
        <div className="flex items-center pb-4 ml-2">
          <Avatar
            size="sm"
            variant="circular"
            src={logo || avatar}
            alt="avatar"
          ></Avatar>
          <div className="flex flex-col">
            <p className="ml-4 py-2 font-roboto font-medium text-sm text-gray-700 no-underline tracking-normal leading-none">
              {name}
            </p>
            <p className="ml-4 py-2 font-roboto font-medium text-sm text-gray-700 no-underline tracking-normal leading-none">
              Published: {timestamp}
            </p>
          </div>
          {user?.uid !== uid && isUidInFriendList === false && (
            <div
              onClick={addUser}
              className="w-full flex justify-end cursor-pointer mr-10"
            >
              <img
                className="hover:bg-blue-100 rounded-xl p-2 h-[75px]"
                src={addFriend}
                alt="addFriend"
              ></img>
            </div>
          )}
        </div>
        <div>{renderTextWithHashtags()}</div>
        {image && (
          <img className="h-[500px] w-full" src={image} alt="postImage"></img>
        )}
        <div className="flex justify-around items-center pt-4">
          <button
            className="flex items-center cursor-pointer rounded-lg p-2 hover:bg-gray-100"
            onClick={handleLike}
            style={{
              color: state.likes?.some((like) => like.id === user?.uid)
                ? "blue"
                : "black",
            }}
          >
            <img className="h-8 mr-4" src={like} alt="" />
            {state.likes?.length >= 0 && state.likes?.length}
          </button>
          <div
            className="flex items-center cursor-pointer rounded-lg p-2 hover:bg-gray-100"
            onClick={handleOpen}
          >
            <div className="flex items-center cursor-pointer">
              <img src={comment} alt="comment" className="h-8 mr-4"></img>
              <p className="font-roboto font-medium text-md text text-gray-700 no-underline tracking-normal leading-none">
                Comments
              </p>
            </div>
          </div>
          <div
            className="flex items-cente cursor-pointer rounded-lg p-2 hover:bg-gray-100r"
            onClick={deletePost}
          >
            <img src={remove} className="h-8 mr-4" alt="delete"></img>
            <p className="font-roboto font-medium text-md text text-gray-700 no-underline tracking-normal leading-none">
              Delete
            </p>
          </div>
        </div>
      </div>
      {open && <CommentSection postId={id}></CommentSection>}
    </div>
  );
};

export default PostCard;
