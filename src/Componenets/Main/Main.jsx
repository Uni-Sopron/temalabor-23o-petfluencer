import React from 'react'
import { Avatar } from '@material-tailwind/react';
import avatar from '../../assets/avatar.png';
import { Button } from "@material-tailwind/react";


const handleImageUpload = () => {
    // Trigger the click event on the hidden file input
    const fileInput = document.getElementById('addImage');
    if (fileInput) {
        fileInput.click();
    }
};


const Main = () => {
    return (
        <div className="flex flex-col items-center">
            <div className="flex flex-col py-4 w-full bg-white rounded-lg shadow-lg">
                <div className="flex items-center border-b-2 border-gray-300 pb-4 pl-4 w-full">
                    <Avatar
                        size="sm"
                        variant="circular"
                        src={avatar}
                        alt="avatar"
                        className="mr-3"
                    ></Avatar>
                    <form className="w-full">
                        <div className="flex justify-between items-center">
                            <div className="w-full m1-4">
                                <input
                                    type="text"
                                    name="text"
                                    placeholder="Whats on your mind?"
                                    className="outline-none w-full bg-white rounded-md"
                                ></input>
                            </div>
                            <div className="mx-4">{/* put previewImage */}</div>
                            <div className='mr-4'>
                                <Button variant="text" type="submit">
                                    Share
                                </Button>
                            </div>
                        </div>
                    </form>
                </div>
                <span>{/* put ProgressBar */}</span>
                <div className="flex justify-around items-center pt-4">
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
                            ></input>
                        </label>

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
            <div className="flex flex-col py-4 w-full">{/* posts */}</div>
            <div>{/* efference for later */}</div>
        </div >
    )
}

export default Main