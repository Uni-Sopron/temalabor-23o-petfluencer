import React from 'react';
import NavLinks from './NavLinks';
import UserLinks from './UserLinks';

// Navbar component
const Navbar = () => {
    return (
        // Container div for the entire navbar
        <div className="flex justify-between items-center border-b border-gray-100 w-full px-44 py-2">

            {/* Logo and Title */}
            <div className="text-5xl font-extrabold text-gray-900 dark:text-white font-roboto">
                {/* Title with Color Transition */}
                <span className="text-transparent bg-clip-text bg-gradient-to-r to-red-600 from-blue-400">
                    Furry Tails
                </span>
            </div>

            {/* Navigation Links */}
            <div className="flex justify-center items-center mx-auto">
                {/* Render the NavLinks component for navigation icons */}
                <NavLinks />
            </div>

            {/* User Links */}
            <div>
                {/* Render the UserLinks component for user-related icons and information */}
                <UserLinks />
            </div>
        </div>
    );
};

export default Navbar;
