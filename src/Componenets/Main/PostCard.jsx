import React from 'react';
import { Avatar } from "@material-tailwind/react";
import avatar from "../../assets/avatar.png";
import like from "../../assets/like.png";
import comment from "../../assets/comment.png"
import remove from "../../assets/delete.png";

const PostCard = ({ uid, id, logo, name, email, text, image, timestamp}) => {
  return (
    <div className="mb-4">
        <div className='flex flex-col py-4 bg-white roundend-t-3xl'>
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
                {/* addFriendImage */}
            </div>
            <div>
                <p className="ml-4 pb-4 font-roboto font-medium text-sm text-gray-700 no-underline tracking-normal leading-none">
                    {text}
                </p>
                {image && 
                    <img className='' src={image} alt="postImage"></img>
                }
            </div>
            <div className='flex justify-around items-center pt-4'>
                <button className='flex items-center cursor-pointer rounded-lg p-2 hover:bg-gray-100'>
                    <img className='h-8 nr-4  mr-9' src={like} alt=""></img>
                    {/*<p>display likes</p>*/}
                    <div className='flex-items-center cursor-pointer rounded-lg p-2 hover:bg-gray-100'>
                        <div className="flex items-center cursor-pointer">
                            <img className='h-8 nr-4 ml-9 mr-9' src={comment} alt="comment"></img>
                            <p className='fontroboto font-medium text-md text-gray-700 no-underline tracking-normal leading-none'>
                                Comment
                            </p>
                        </div>
                    </div>
                    <div className='flex items-center cursor-pointer rounded-lg p-2 hover:bg-gray-100'>
                        <img className='h-8 nr-4 ml-9' src={remove} alt="delete"></img>
                        <p className='fontroboto font-medium text-md text-gray-700 no-underline tracking-normal leading-none'>
                            Delete
                         </p>
                    </div>
                </button>
            </div>
        </div>
    </div>
  );
}

export default PostCard;
