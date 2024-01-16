import { Avatar } from '@material-tailwind/react';
import avatar from './../../assets/avatar.png';
import React from 'react';

const Comment = ({ name, comment, image }) => {
  const extractHashtags = (text) => {
    const regex = /#\w+/g;
    return text.match(regex) || [];
  };

  const renderCommentWithHashtags = () => {
    const hashtags = extractHashtags(comment);

    if (hashtags.length === 0) {
      return <span>{comment}</span>;
    }

    let commentWithHashtags = comment;

    hashtags.forEach((hashtag) => {
      const parts = commentWithHashtags.split(hashtag);
      commentWithHashtags = (
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

    return <div>{commentWithHashtags}</div>;
  };

  // Simulate the action when clicking a hashtag
  const handleHashtagClick = (hashtag) => {
    console.log(`Clicked on hashtag: ${hashtag}`);
    // Implement navigation or other actions related to hashtags here
  };

  return (
    <div className='flex items-center mt-2 w-full'>
      <div className='mx-2'>
        <Avatar size='sm' variant='circular' src={image || avatar} alt='avatar' />
      </div>
      <div className='flex flex-col items-start bg-gray-100 rounded-2x1 p-1 max-w-[600px]'>
        <p className='font-roboto text-black text-sm no-underline tracking-normal leading-none p-1 font-medium'>{name}</p>
        <p className='font-roboto text-black text-sm no-underline tracking-normal leading-none p-1 font-medium'>
          {renderCommentWithHashtags()}
        </p>
      </div>
    </div>
  );
};

export default Comment;
