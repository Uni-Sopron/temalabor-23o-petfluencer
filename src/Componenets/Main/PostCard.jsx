import React, { useContext, useReducer, useEffect } from 'react';
import { Avatar } from "@material-tailwind/react";
import avatar from "../../assets/avatar.png";
import like from "../../assets/like.png";
import comment from "../../assets/comment.png"
import addFriend from "../../assets/addfriend.png"
import remove from "../../assets/delete.png";
import AuthContext from "../AppContext/AppContext";
import { PostReducer, postActions, postsStates } from '../AppContext/PostReducer';
import { collection, where, deleteDoc, setDoc, query, onSnapshot, getDocs, updateDoc, arrayUnion, doc } from 'firebase/firestore';
import { db } from '../Firebase/firebase';


const PostCard = ({ uid, id, logo, name, email, text, image, timestamp}) => {
    const user = useContext(AuthContext)
    const [state, dispatch] = useReducer(PostReducer, postsStates)
    const likesRef = doc(collection(db, 'posts', id, "likes"))
    const likesCollection = collection(db, 'posts', id, "likes")
    const {ADD_LIKE, HANDLE_ERROR} = postActions

    const addUser = async () => {
        try {
            const q = query(collection(db, 'users'), where("uid", "==", user?.uid))
            const doc = await getDocs(q)
            const data = doc.docs[0].ref;
            await updateDoc(data, {friends: arrayUnion({ id: uid, image: logo, name: name })})
        }
        catch (err) {
            alert(err.message)
            console.log(err.message);
        }
    }

    const handleLike = async (e) => {
        e.preventDefault();
        const q = query(likesCollection, where("id", "==", user?.uid));
        const querySnapshot = await getDocs(q);
        const likesDocId = await querySnapshot?.docs[0]?.id;
        try{
            if (likesDocId !== undefined) {
                const deleteId = doc(db, "posts", id, "likes", likesDocId);
                await deleteDoc(deleteId);
            }
            else {
                await setDoc(likesRef, {
                    id: user?.uid
                });
            }
        } catch (err) {
            alert(err.message);
            console.log(err.message);
        }
    }

    useEffect(() => {
        const getLikes = async () => {
            try {
                const q = collection(db, 'posts', id, "likes");
                await onSnapshot(q, (doc) => {
                    dispatch({ type: ADD_LIKE, likes: doc.docs.map((item) => {
                        item.data()
                    }) })
                })
            } catch (err) {
                dispatch({ type: HANDLE_ERROR });
                alert(err.message);
                console.log(err.message);
            }
        }
        return () => {
            getLikes()
        }
    }, [id, ADD_LIKE, HANDLE_ERROR])
    
    return (
        <div className="mb-4">
            <div className='flex flex-col py-4 bg-white roundend-t-3xl border-b-2 border-gray-300 rounded-lg shadow-lg'>
                <div className='glex items-center ph-4 ml-2'>
                    <Avatar size="sm" variant="circular" src={logo || avatar} alt="avatar"></Avatar>
                    <div className='flex flex-col'>
                        <p className="ml-4 py-2 font-roboto font-medium text-sm text-gray-700 no-underline tracking-normal leading-none">
                        {email}
                        </p>
                        <p className="ml-4 font-roboto font-medium text-sm text-gray-700 no-underline tracking-normal leading-none">
                        Pubished: {timestamp}
                        </p>
                    </div>
                    {user?.uid !== uid && <div onClick={addUser} className='w-full flex justify-end cursor-pointer mr-10'>
                        <img className='hover:bg-blue-100 h-5 rounded-xl p-2' src={addFriend} alt="addFriend"></img>
                    </div>}
                </div>
                <div>
                    <p className="ml-4 pb-4 font-roboto mt-2 ml-2 font-medium text-sm text-gray-700 no-underline tracking-normal leading-none">
                        {text}
                    </p>
                    {image && 
                        <img className='pl-4 pt-4 pb-4 pr-4' src={image} alt="postImage"></img>
                    }
                </div>
                <div className='flex justify-around items-center pt-4 mt-1'>
                        <button className='flex items-center cursor-pointer rounded-lg p-2 hover:bg-blue-100' onClick={handleLike}>
                            <img className='h-8 nr-4  mr-9' src={like} alt="like"></img>
                        </button>
                        {state.likes?.length > 0 && state.likes?.length}
                        <div className='flex-items-center cursor-pointer rounded-lg p-2 hover:bg-blue-100'>
                            <div className="flex items-center cursor-pointer">
                                <img className='h-8 nr-4 ml-9 mr-9' src={comment} alt="comment"></img>
                                <p className='fontroboto font-medium text-md text-gray-700 no-underline tracking-normal leading-none'>
                                    Comment
                                </p>
                            </div>
                        </div>
                        <div className='flex items-center cursor-pointer rounded-lg p-2 hover:bg-blue-100'>
                            <img className='h-8 nr-4 ml-9' src={remove} alt="delete"></img>
                            <p className='fontroboto font-medium text-md text-gray-700 no-underline tracking-normal leading-none'>
                                Delete
                            </p>
                        </div>
                    
                </div>
            </div>
        </div>
    );
}

export default PostCard;
