import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
 import { useSession } from "next-auth/react"
  
  export function AvatarComponent() {
   const { data: session } = useSession()
    return (
      <Avatar className="cursor-pointer p-0">
        <AvatarImage src={session?.user.image ?? undefined} alt={session?.user.name ?? undefined} />
        <AvatarFallback></AvatarFallback>
      </Avatar>
    )
  }
  