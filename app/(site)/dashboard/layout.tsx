import Widget from "@/components/ai-assistant/widget";
import ProSidebar from "@/components/pro-sidebar";
import { AssistantContextProvider } from "@/context/assistant-context";
import { MessagesContextProvider } from "@/context/messages-context";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {

  return (
    <div className="flex w-full bg-white h-full">
      <section>
        <ProSidebar />
      </section>
      <section className="flex-1 px-8 pt-16 min-h-[90vh]">
        <AssistantContextProvider>
        <MessagesContextProvider>
        {children}
        </MessagesContextProvider>
      </AssistantContextProvider>
      </section>
    </div>
  );
};
export default DashboardLayout;
