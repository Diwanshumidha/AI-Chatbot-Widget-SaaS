import Image from "next/image";
import { FaMinus } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { LuDot } from "react-icons/lu";

const ChatbotPrototype = ({ name, logo, logoState }: { name: string, logo:string, logoState: string }) => {
  return (
    <div className="bg-slate-100 rounded-2xl h-full w-96">
      <div className="justify-between p-3 flex items-center bg-orange-500 rounded-t-2xl rounded-b-none text-white">
            <div className="flex items-center">
           <LuDot className="text-green-500" size={40} />
            <h2 className="text-lg font-bold text-center">{name}</h2>
            </div>
            <div className="flex space-x-3">
            <FaMinus className="cursor-pointer hover:text-black/60" />
            <IoClose className="cursor-pointer hover:text-black/60" />
            </div>
            </div>
            <Image className="rounded-full" src={logoState || ""} alt="chatbot" width={100} height={100} />
    </div>
  );
};

export default ChatbotPrototype;
