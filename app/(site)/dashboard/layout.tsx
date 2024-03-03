import ProSidebar from "@/components/pro-sidebar";
import { AssistantContextProvider } from "@/context/assistant-context";
import { MessagesContextProvider } from "@/context/messages-context";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex w-full bg-slate-100 h-screen">
      <ProSidebar />
      <AssistantContextProvider>
        <MessagesContextProvider>
        {children}
        </MessagesContextProvider>
      </AssistantContextProvider>
    </div>
  );
};
export default DashboardLayout;
