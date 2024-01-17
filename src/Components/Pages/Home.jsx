import React from 'react'
import LeftSide from '../LeftSidebar/LeftSide'
import RightSide from "../RightSidebar/RightSide";
import Navbar from '../Navbar/Navbar'
import Main from '../Main/Main';


const Home = () => {
    console.log(process.env, "process.env")
  return (
    <div className="w-full">
      <div className="fixed top-0 z-10 w-full bg-white">
        <Navbar></Navbar>
      </div>
      <div className="flex bg-gray-100">
        <div className="flex-auto w-[20%] fixed top-12">
          <LeftSide></LeftSide>
        </div>
        <div className="flex-auto w-[60%] absolute left-[20%] top-14 bg-gray-100 rounded-x]">
          <div className="w-[80%] mx-auto">
            <Main></Main>
          </div>
        </div>
        <div className="flex-auto w-[20%] fixed right-0 top-12">
          <RightSide></RightSide>
        </div>
      </div>
    </div>
  )
}

export default Home