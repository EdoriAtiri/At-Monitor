import { Link } from 'react-router-dom'
import Logo from '../components/Logo'
import {
  FaCalendarDays,
  FaPersonCircleCheck,
  FaUserCheck,
  FaGear,
  FaPowerOff,
} from 'react-icons/fa6'

function Dashboard() {
  return (
    <div className="flex flex-row relative">
      <Logo />
      {/* Dashboard SideBar */}
      <section
        title="side bar"
        className="w-64 h-screen pt-32 bg-sky-400 space-y-16"
      >
        <nav className="pl-6">
          <ul className="text-xl font-semibold space-y-6">
            <li className="sidebar-icons">
              <FaCalendarDays /> <Link>Events</Link>
            </li>
            <li className="sidebar-icons">
              <FaPersonCircleCheck /> <Link>Registrars</Link>
            </li>
            <li className="sidebar-icons">
              <FaUserCheck />
              <Link>Profile</Link>
            </li>
          </ul>
        </nav>

        <ul className="text-xl opacity-80 font-semibold space-y-6 pl-6">
          <li className="sidebar-icons">
            <FaGear />
            <Link>Settings</Link>
          </li>
          <li className="sidebar-icons">
            <FaPowerOff /> <Link>Logout</Link>
          </li>
        </ul>
      </section>

      {/* Events */}
      {/* <section title="Dashboard">
        <heading className="flex">
          <h1>My Events</h1>
          <button>Create a new Event</button>
        </heading>
      </section> */}
    </div>
  )
}

export default Dashboard
