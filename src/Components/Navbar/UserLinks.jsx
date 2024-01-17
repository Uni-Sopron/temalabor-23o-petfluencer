// Import React and required components from the Material Tailwind library
import React, { useContext } from 'react';
import { Avatar } from '@material-tailwind/react';
import avatar from '../../assets/avatar.png';
import { AuthContext } from '../AppContext/AppContext';

// UserLinks component
const UserLinks = () => {

    const { signOutUser, user, userData } = useContext(AuthContext);

    return (
        // Container div for the entire user links section
        <div className="flex justify-center items-center cursor-pointer">

            {/* First Icon */}
            <div className="hover:translate-y-1 duration-500 ease-in-out hover:text-blue-500">
                {/* SVG icon representing an function */}
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
                        d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                    />
                </svg>
            </div>

            {/* Second Icon */}
            <div className="hover:translate-y-1 duration-500 ease-in-out hover:text-blue-500">
                {/* SVG icon representing an function */}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6 mx-3"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                    />
                </svg>
            </div>

            {/* Third Icon */}
            <div className="hover:translate-y-1 duration-500 ease-in-out hover:text-blue-500">
                {/* SVG icon representing an function */}
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
                        d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
                    />
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                </svg>
            </div>

             {/* Avatar and User Info Section */}
            <div className="mx-4 flex items-center">   
                    <Avatar src={user?.photoURL || avatar} size="sm" alt="avatar"></Avatar>
                {/* User name */}
                <p className="m1-4 font-roboto text-sm text-black font-medium no-underline">
                    {user?.displayName === null && userData?.name !== undefined
                    ? userData?.name?.charAt(0)?.toUpperCase() +
                    userData?.name?.slice(1)
                    : user?.displayName?.split(" ")[0]}
                </p>

                {/* Sign Out button */}
                <div className="ml-2 cursor-pointer text-sm text-gray-700" onClick={signOutUser}>
                    {/* Sign Out text */}
                    Sign Out
                </div>
            </div>

        </div>
    );
};

// Export the UserLinks component
export default UserLinks;