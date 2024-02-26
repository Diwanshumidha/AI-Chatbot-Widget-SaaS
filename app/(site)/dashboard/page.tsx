import { auth } from '@/auth'

const DashboardPage = async () => {
    const session = await auth();
    console.log("session", session)
  return (
    <div>
      <p>{session?.user.name}</p>
      <p>{session?.user.isOAuth}</p>
      {JSON.stringify(session, null, 2)}
      </div>
  )
}

export default DashboardPage