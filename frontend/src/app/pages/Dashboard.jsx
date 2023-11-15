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
        className="fixed left-0 top-0 h-screen w-60 space-y-16 bg-sky-400 pt-14"
      >
        <Logo />
        <nav className="pl-6">
          <ul className="space-y-6 text-xl font-semibold">
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

        <ul className="space-y-6 pl-6 text-xl font-semibold opacity-80">
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
