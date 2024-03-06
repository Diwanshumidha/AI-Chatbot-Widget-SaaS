import { database } from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { apiKey: string } }) {
      const apiKey = params.apiKey;
      console.log(apiKey)
   
    // If body contains API key
    if (!apiKey || typeof apiKey !== 'string') {
        return NextResponse.json({
            error: "You are not authorized to perform this action",
        }, {status: 401});
    }

    // Check if the API key has the correct syntax
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

    if(!uuidRegex.test(apiKey)){
        return NextResponse.json({
          error: "You are not authorized to perform this action"
        }, {status:401});
    }

    // Check The Database for the api key
    const chatbot = await database.chatbot.findFirst({
        where: {
            apiKey: apiKey
        },
        select:{
            chatBotName:true,
            colorScheme:true,
            welcomeMessage:true,
            apiKey:true,
            logoUrl:true,
        }
    });

    // If the API key is not found in the database
    if(!chatbot || !chatbot.apiKey){
        return NextResponse.json({
            error: "You are not authorized to perform this action"
          }, {status:401});
    }

    console.log(chatbot)

    return NextResponse.json({data:chatbot});
}