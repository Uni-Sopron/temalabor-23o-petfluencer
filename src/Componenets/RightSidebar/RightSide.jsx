import React, { useState } from "react";
import waterslide from '../../assets/waterslide.jpg'


const RightSide = () => {
  const [input, setInput] = useState("");


  return (
    <div className="flex flex-col h-screen bg-white shadow-1g border-2 rounded-1-xl">
      <div className="flex flex-col items-center relative pt-10">
        <img className="h-48 rounded-md" src={waterslide} alt="nature"></img>
      </div>
      <p className="font-roboto font-normal text-sm text-gray-700 max-w-fit no-underline tracking-normal leading-tight py-2 mx-2">
        Through photography, the beauty of Mother Nature can be frozen in time.
        This category celebrates the magic of our planet and beyond - from the immensity of the great outdoors,
        to miraculous moments in your own
        backyard.
      </p>
      <div className="mx-2 mt-10">
        <p className="font-roboto font-medium text-sm text-gray-700 no-underline tracking-normal leading-none">
          Friends:{""}
        </p>
        <input
          className="border-0 outline-none mt-4"
          name="input" value={input}
          type="text"
          placeholder="Search friends" onChange={(e) => setInput(e.target.value)}
        ></input>
      </div>
    </div>
  )
}

export default RightSide