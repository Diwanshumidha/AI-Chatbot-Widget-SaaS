"use client";

import { FaRocketchat } from "react-icons/fa";
import { Button } from "../ui/button";
import { useState } from "react";
import { FaMinus } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { LuDot } from "react-icons/lu";

const Widget = () => {
  const [chatBox, setChatBox] = useState(false);

  const handleChatBox = () => {
    setChatBox(!chatBox);
  };

  return (
    <div className="fixed bottom-5 right-5 p-3">
      <Button onClick={() => handleChatBox()} className="bg-orange-500 p-7 rounded-full hover:bg-orange-500/70">
        <FaRocketchat
          
          className="w-8 h-8 text-white cursor-pointer"
        />
      </Button>
      {chatBox && <div className="bg-slate-100 absolute bottom-full right-0 rounded-2xl h-full w-96">
           <div className="justify-between p-3 flex items-center bg-orange-500 rounded-t-2xl rounded-b-none text-white">
            <div className="flex items-center">
           <LuDot className="text-green-500" size={40} />
            <h2 className="text-lg font-bold text-center">Chatty Assistant</h2>
            </div>
            <div className="flex space-x-3">
            <FaMinus onClick={() => handleChatBox()} className="cursor-pointer hover:text-black/60" />
            <IoClose onClick={() => handleChatBox()} className="cursor-pointer hover:text-black/60" />
            </div>
            </div>
        </div>}
    </div>
  );
};

export default Widget;
