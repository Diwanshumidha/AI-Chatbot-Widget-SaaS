import { auth } from "@/auth";
import Widget from "@/components/ai-assistant/widget";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FaPlus } from "react-icons/fa6";

const DashboardPage = async () => {
  const session = await auth();
  console.log("session", session);
  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="flex justify-between">
        <div className="flex flex-col">
          <h2 className="text-3xl font-extrabold">
            Hello {session?.user.name},
          </h2>
          <p className="text-muted-foreground mt-1">
            This is what we've got for you today.
          </p>
        </div>
        <Link href="/dashboard/create-chatbot">
        <Button className="flex gap-x-2 items-center"><FaPlus />Manage Chatbot</Button>
        </Link>
      </div>

      <Widget />
    </div>
  );
};

export default DashboardPage;
