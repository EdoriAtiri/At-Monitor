import { useAuthStatus } from '../hooks/useAuthStatus'
import NotLoggedIn from '../components/NotLoggedIn'

function Home() {
  const { loggedIn } = useAuthStatus()

  return loggedIn ? <div>raa</div> : <NotLoggedIn />
}

export default Home
