import React, { cloneElement } from "react";
import {
  HomeIcon,
  BarChartIcon,
  CalendarIcon,
  UserIcon,
} from "lucide-react";
const Footer = () => {
  return (
    <div className="flex fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 shadow-lg rounded-t-xl z-10 h-[80px]">
      <div className="flex flex-1 justify-around items-center ">
        <button
          // key={item.id}
          // onClick={() => setActiveTab(item.id)}
          className="flex flex-1 flex-col items-center justify-center w-full h-full"
        >
          <HomeIcon />
          <span className="text-xs mt-1">Home</span>
        </button>
      </div>
      <div className="flex flex-1 justify-around items-center ">
        <button
          // key={item.id}
          // onClick={() => setActiveTab(item.id)}
          className="flex flex-1 flex-col items-center justify-center w-full h-full"
        >
          <BarChartIcon />
          <span className="text-xs mt-1">Stats</span>
        </button>
      </div>
      <div className="flex flex-1 justify-around items-center ">
        <button
          // key={item.id}
          // onClick={() => setActiveTab(item.id)}
          className="flex flex-1 flex-col items-center justify-center w-full h-full"
        >
          <CalendarIcon />
          <span className="text-xs mt-1">Calendar</span>
        </button>
      </div>
      <div className="flex flex-1 justify-around items-center ">
        <button
          // key={item.id}
          // onClick={() => setActiveTab(item.id)}
          className="flex flex-1 flex-col items-center justify-center w-full h-full"
        >
          <UserIcon />
          <span className="text-xs mt-1">Profile</span>
        </button>
      </div>
    </div>
  );
};

export default Footer;
