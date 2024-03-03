import { auth } from '@/auth'
import Widget from '@/components/ai-assistant/widget';

const DashboardPage = async () => {
    const session = await auth();
    console.log("session", session)
  return (
    <div className=''>
      <p>{session?.user.name}</p>
      <p>{session?.user.isOAuth}</p>
      {JSON.stringify(session, null, 2)}
      <Widget />
      </div>
  )
}

export default DashboardPage;