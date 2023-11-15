import { Link, Outlet } from "react-router-dom";
import Logo from "../components/Logo";
import {
  FaCalendarDays,
  FaPersonCircleCheck,
  FaUserCheck,
  FaGear,
  FaPowerOff,
  FaPeopleGroup,
} from "react-icons/fa6";

function Dashboard() {
  return (
    <div className="relative flex flex-row">
      {/* Dashboard SideBar */}
      <section
        title="side bar"
        className="w-60 h-screen pt-14 bg-sky-400 space-y-16 fixed top-0 left-0"
      >
        <Logo />
        <nav className="pl-6">
          <ul className="text-xl font-semibold space-y-6">
            <li className="sidebar-icons">
              <FaCalendarDays /> <Link to="events">Events</Link>
            </li>
            <li className="sidebar-icons">
              <FaPersonCircleCheck /> <Link to="registrars">Registrars</Link>
            </li>
            <li className="sidebar-icons">
              <FaPeopleGroup />
              <Link to="members">Members</Link>
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
      <div className="ml-60 w-full">
        <Outlet />
      </div>
    </div>
  );
}

export default Dashboard;
