import Image from "next/image";
import { FaMinus } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { LuDot } from "react-icons/lu";
import { GoDotFill } from "react-icons/go";

const ChatbotPrototype = ({
  name,
  logoState,
  welcomeMessage,
  colorScheme,
}: {
  name: string;
  logoState: string;
  welcomeMessage: string;
  colorScheme: string;
}) => {
  return (
    <div className="bg-slate-50 rounded-2xl shadow-xl h-[70dvh] w-96 sticky top-24">
      <div
        style={{ backgroundColor: colorScheme || "#f97316" }}
        className="justify-between p-3 flex items-center rounded-t-2xl rounded-b-none text-white"
      >
        <div className="flex items-center">
          <LuDot className="text-green-500" size={40} />
          <h2 className="text-lg font-bold text-center">{name || "Chatty"}</h2>
        </div>
        <div className="flex space-x-3">
          <FaMinus className="cursor-pointer hover:text-black/60" />
          <IoClose className="cursor-pointer hover:text-black/60" />
        </div>
      </div>
      <Image
        className="rounded-full mx-auto mt-4 mix-blend-multiply object-contain"
        src={logoState || "/chatty-logo.png"}
        alt="chatbot"
        width={100}
        height={100}
      />
      <div className="px-3">
        <p style={{ backgroundColor: colorScheme || "#f97316" }} className="border break-words p-3 w-1/2 mt-10 rounded-2xl bg-orange-500 text-white">
          {welcomeMessage || "Hello, I'm Chatty! How can I help you today?"}
        </p>
        <div className="px-4 flex justify-end mt-6">
                <p className="flex break-words py-1 text-start rounded-lg mb-2 w-1/3 text-slate-500 text-sm">
                  {Array.from({ length: 3 }).map((_, index) => (
                    <GoDotFill
                      key={`LoaderProto-${index}`}
                      className={`animate-bounce delay-${index * 100} `}
                      size={18}
                    />
                  ))}
                </p>
              </div>
      </div>
    </div>
  );
};

export default ChatbotPrototype;
