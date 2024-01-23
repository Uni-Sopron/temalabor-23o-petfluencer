import React from 'react'
import LeftSide from '../LeftSidebar/LeftSide'
import RightSide from "../RightSidebar/RightSide";
import Navbar from '../Navbar/Navbar'
import Main from '../Main/Main';


const Home = () => {
  return (
    <div className="w-full">
      <div className="sticky z-10 w-full bg-white">
        <Navbar></Navbar>
      </div>
      <div className="grid bg-gray-100 md:grid-cols-4 grid-cols-1">
        <div className="">
          <LeftSide></LeftSide>
        </div>
        <div className="flex col-span-2 justify-center">
            <Main></Main>
        </div>
        <div className="">
          <RightSide></RightSide>
        </div>
      </div>
    </div>
  )
}

export default Home