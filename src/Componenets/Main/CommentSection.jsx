import { Avatar } from '@material-tailwind/react'
import avatar from './../../assets/avatar.png'
import React, { useContext, useEffect, useReducer, useRef } from 'react'
import { AuthContext } from '../AppContext/AppContext'
import { doc, collection, setDoc, serverTimestamp, orderBy, onSnapshot, query } from 'firebase/firestore'
import { db } from '../Firebase/firebase';
import { PostReducer, postActions, postsStates } from '../AppContext/PostReducer'
import Comment from "./Comment";

const CommentSection = ({ postId }) => {
  const comment = useRef("")
  const { user, userData } = useContext(AuthContext)
  const commentRef = doc(collection(db, 'posts', postId, 'comments'))
  const [state, dispatch] = useReducer(PostReducer, postsStates);
  const { ADD_COMMENT, HANDLE_ERROR } = postActions

  const addComment = async (e) => {
    e.preventDefault();
  
    if (!comment || !comment.current) {
      return; // Null check to avoid errors
    }
  
    if (comment.current.value !== "") {
      try {
        await setDoc(commentRef, {
          id: commentRef.id,
          comment: comment.current.value,
          image: user?.photoURL,
          name: user?.displayName,
          timestamp: serverTimestamp(),
        });
  
        if (comment && comment.current) {
          comment.current.value = "";
        }
      } catch (err) {
        dispatch({ type: HANDLE_ERROR });
        alert(err.message);
        console.error(err.message);
      }
    }
  };
  
  


  useEffect(() => {
    const getComments = async () => {
      try {
        const collectionOfComments = collection(db, `posts/${postId}/comments`);
        const q = query(collectionOfComments, orderBy("timestamp", "desc"));
        onSnapshot(q, (doc) => {
          dispatch({
            type: ADD_COMMENT,
            comments: doc.docs?.map((item) => item.data()),
          });
        });
      } catch (err) {
        dispatch({ type: HANDLE_ERROR });
        alert(err.message);
        console.log(err.message);
      }
    };
    return () => getComments();
  }, [postId, ADD_COMMENT, HANDLE_ERROR]);

  return (
    <div className='flex flex-col bg-white w-full py-2 rounded-b-3x1'>
      <div className='flex items-center'>
        <div className='mx-2'>
          <Avatar size="sm" variant='circular' src={user?.photoURL || avatar}></Avatar>
        </div>
        <div className='w-full pr-2'>
          <form className='flex items-center w-full' onSubmit={addComment}>
            <input name='comment' className='w-full rounded-2x1 outline-none border-0 p-2 bg-gray-100' ref={comment} placeholder='Write a comment...' type='text'></input>
            <button className='hidden' type="submit">Submit</button>
          </form>
        </div>
      </div>
      {state?.comments?.map((comment, index) => {
        return (
          <Comment
            key={index}
            image={comment?.image}
            name={comment?.name}
            comment={comment?.comment}
          ></Comment>
        );
      })}
    </div>
  )
}

export default CommentSection
