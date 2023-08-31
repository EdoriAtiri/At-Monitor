import { Link, Outlet } from 'react-router-dom'
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
        className="w-96 h-screen pt-32 bg-sky-400 space-y-16"
      >
        <nav className="pl-6">
          <ul className="text-xl font-semibold space-y-6">
            <li className="sidebar-icons">
              <FaCalendarDays /> <Link to="events">Events</Link>
            </li>
            <li className="sidebar-icons">
              <FaPersonCircleCheck /> <Link>Registrars</Link>
            </li>
            <li className="sidebar-icons">
              <FaUserCheck />
              <Link to="profile">Profile</Link>
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

      {/* Outlet */}
      <Outlet />
    </div>
  )
}

export default Dashboard
