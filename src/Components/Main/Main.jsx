import React, { useState, useRef, useContext, useReducer, useEffect } from 'react'
import { Avatar } from '@material-tailwind/react';
import avatar from '../../assets/avatar.png';
import { Button } from "@material-tailwind/react";
import { AuthContext } from '../AppContext/AppContext';
import { doc, collection, setDoc, serverTimestamp, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../../Config/firebase';
import { PostReducer, postActions, postsStates } from '../AppContext/PostReducer';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { Alert } from '@material-tailwind/react'
import PostCard from './PostCard';


const handleImageUpload = () => {
    // Trigger the click event on the hidden file input
    const fileInput = document.getElementById('addImage');
    if (fileInput) {
        fileInput.click();
    }
};

const Main = () => {

    const { user, userData } = useContext(AuthContext);
    const text = useRef("");
    const [image, setImage] = useState(null);
    const collectionRef = collection(db, "posts");
    const postRef = doc(collection(db, "posts"));
    const document = postRef.id;
    const [state, dispatch] = useReducer(PostReducer, postsStates);
    const { SUBMIT_POST, HANDLE_ERROR } = postActions;
    const [file, setFile] = useState(null);
    const [progressBar, setProgressBar] = useState(0);

    const handleUpload = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmitPost = async (e) => {
        e.preventDefault()
        if (text.current.value !== "") {           
            try {
             
            await setDoc(postRef, {
                documentId: document,
                uid: user?.uid || userData?.uid,
                logo: user?.photoURL,
                name: user?.displayName || userData?.name,
                email: user?.email || userData?.email,
                text: text.current.value,
                image: image,
                timestamp: serverTimestamp(),
            });
            text.current.value = "";
        } catch (err) {
        dispatch({ type: HANDLE_ERROR });
        alert(err.message);
        console.log(err);
            }
        } else {
            dispatch({ type: HANDLE_ERROR });
        }
    };

    const storage = getStorage();

    const metadata = {
        contentType: ['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/svg+xml']
    };

    const submitImage = async () => {
        const fileType = metadata.contentType.includes(file["type"]);
        console.log("file",file);
        if (!file) {
            return;
        }
        if (fileType) {
            try {
                const storageRef = ref(storage, `images/${file.name}`);
                const uploadTask = uploadBytesResumable(storageRef, file, metadata.contentType);
                await uploadTask.on('state_changed', (snapshot) => {
                    const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                    setProgressBar(progress);
                }, (error) => {
                    alert(error);
                    console.log(error);
                }, async () => {
                    await getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setImage(downloadURL);
                    });
                });
            }
            catch (err) {
                dispatch({ type: HANDLE_ERROR });
                alert(err.message);
                console.log(err);
            }
        }
    };

    useEffect(() => {
        const postData = async () => {
            const q = query(collectionRef, orderBy("timestamp", "desc"));
            await onSnapshot(q, (doc) => {
                dispatch({ 
                    type: SUBMIT_POST, 
                    posts: doc.docs.map((item) => item.data())
                });
                setImage(null);
                setFile(null);
                setProgressBar(0);
            });
        };

        return () => postData();

    }, [SUBMIT_POST] );



    return (
        <div className="flex flex-col items-center mt-5">
            <div className="flex flex-col py-4 w-full bg-white rounded-lg shadow-lg">
                <div className="flex items-center border-b-2 border-gray-300 pb-4 pl-4 w-full">
                    <Avatar
                        size="sm"
                        variant="circular"
                        src={user?.photoURL || avatar}
                        alt="avatar"
                        className="mr-3"
                    ></Avatar>
                    <form className="w-full" onSubmit={handleSubmitPost}>
                        <div className="flex justify-between items-center">
                            <div className="w-full m1-4">
                                <input
                                    type="text"
                                    name="text"
                                    placeholder={'What\'s on your mind ' + (user?.displayName?.split(" ")[0] || (userData?.name?.charAt(0).toUpperCase() + userData?.name?.slice(1)))}
                                    className="outline-none w-full bg-white rounded-md"
                                    ref={text}
                                ></input>
                            </div>
                            <div className="mx-4">{image && <img className='h-24 rounded-xl' src={image} alt='previewImage'></img>}</div>
                            <div className='mr-4'>
                                <Button variant="text" type="submit">
                                    Share
                                </Button>
                            </div>
                        </div>
                    </form>
                </div>
                <span style = {{width: `${progressBar}%`}} className='bg-blue-700 py-1 rounded-md'></span>
                <div className="flex justify-around items-center pt-4 ">
                    <div className="flex items-center" >
                        <label
                            onClick={handleImageUpload}
                            htmlFor="addImage"
                            className="cursor-pointer flex items-center"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="w-6 h-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 10.5v6m3-3H9m4.06-7.19l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
                                />
                            </svg>
                            <Button variant='text' >Upload</Button>
                            <input
                                id="addImage"
                                type="file"
                                style={{ display: "none" }}
                                onChange={handleUpload}
                            ></input>
                        </label>
                        {file && <Button variant='text' onClick={submitImage}>Upload</Button>}
                    </div>
                    <div className="flex items-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-6 h-6 mx-1"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25"
                            />
                        </svg>

                        <p className="font-roboto font-medium text-md text-gray-700 no-underline tracking-normal leading-none">
                            Live
                        </p>
                    </div>
                    <div className="flex items-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-6 h-6 mx-1"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
                            />
                        </svg>

                        <p className="font-roboto font-medium text-md text-gray-700 no-underline tracking-normal leading-none">
                            Emoji
                        </p>
                    </div>
                </div>
            </div>
            <div className="flex flex-col py-4 w-full">
                {state.error ? (
                    <div className='flex fustify-center items-center'>
                        <Alert color="red">
                            Something went wrong refresh and try again...
                        </Alert>
                    </div>
                ) : (
                    <div>
                        {state.posts.length > 0 && state.posts?.map((post, index) => {
                            return <PostCard 
                                key={index}
                                logo={post.logo}
                                id={post.documentId}
                                uid={post?.uid}
                                name={post.name}
                                email={post.email}
                                image={post.image}
                                text={post.text}
                                timestamp={new Date(post?.timestamp?.toDate())?.toUTCString()}
                            ></PostCard>
                        })}
                    </div>
                )}
            </div>
        </div >
    )
}

export default Main
