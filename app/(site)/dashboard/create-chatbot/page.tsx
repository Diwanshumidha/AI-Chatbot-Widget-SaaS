import ChatbotForm from "@/components/creating-chatbot/ChatbotForm"


const CreateChatbotPage = () => {
  return (
    <div>
      <h1 className="text-3xl font-extrabold text-center">
          Create Your Chatbot in just a few steps
        </h1>
        <p className="text-center text-muted-foreground text-sm my-2">Build a chatbot by just answering a few simple questions.</p>
        <div className="w-full justify-around flex">
           <ChatbotForm />
        </div>
       
    </div>
  )
}

export default CreateChatbotPage