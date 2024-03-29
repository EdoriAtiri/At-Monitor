import { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Logo from "../components/Logo";
import {
  FaCalendarDays,
  FaPersonCircleCheck,
  // FaUserCheck,
  // FaGear,
  FaPowerOff,
  FaPeopleGroup,
} from "react-icons/fa6";
import { AiOutlineMenu } from "react-icons/ai";
import { logout } from "../features/Auth/authSlice";
import useSuperUserCheck from "../hooks/useSuperUserCheck";

function Dashboard() {
  const isSuperUser = useSuperUserCheck();

  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const closeMobileMenu = () => {
    if (showMobileMenu) {
      setShowMobileMenu(false);
    }
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onClickLogout = () => {
    closeMobileMenu();
    dispatch(logout());
    navigate("/signup");
  };

  return (
    <div className="relative flex flex-row">
      {/* Open Mobile Menu */}
      <button
        onClick={() => setShowMobileMenu(!showMobileMenu)}
        className="absolute left-3 top-3 z-30 lg:hidden"
      >
        <AiOutlineMenu />
      </button>

      {/* Dark Overlay for mobile menu */}

      <button
        onClick={closeMobileMenu}
        className={`absolute inset-0 z-20 h-full min-h-screen w-full bg-black opacity-30 lg:hidden ${
          !showMobileMenu && "hidden"
        }`}
      ></button>

      {/* Dashboard SideBar */}
      <section
        title="side bar"
        className={`fixed left-0 top-0 ${
          !showMobileMenu && "-translate-x-96 transform"
        } z-[25] h-screen w-60 space-y-16 bg-sky-400 pt-14 transition-transform duration-300 lg:z-0  lg:-translate-x-0`}
      >
        <div className="pl-6">
          <Logo />
        </div>
        <nav className="pl-6">
          <ul className="space-y-6 text-xl font-semibold">
            <li onClick={closeMobileMenu} className="sidebar-icons">
              <FaCalendarDays /> <Link to="events">Events</Link>
            </li>
            {isSuperUser && (
              <li onClick={closeMobileMenu} className="sidebar-icons">
                <FaPersonCircleCheck /> <Link to="registrars">Registrars</Link>
              </li>
            )}
            <li onClick={closeMobileMenu} className="sidebar-icons">
              <FaPeopleGroup />
              <Link to="members">Members</Link>
            </li>
            {/* <li onClick={closeMobileMenu} className="sidebar-icons">
              <FaUserCheck />
              <Link to="profile">Profile</Link>
            </li> */}
          </ul>
        </nav>

        <ul className="space-y-6 pl-6 text-xl font-semibold ">
          {/* <li onClick={closeMobileMenu} className="sidebar-icons">
            <FaGear />
            <Link>Settings</Link>
          </li> */}
          <li onClick={onClickLogout} className="sidebar-icons">
            <FaPowerOff /> <Link>Logout</Link>
          </li>
        </ul>
      </section>

      {/* Outlet */}
      <div className="w-full lg:ml-60">
        <Outlet />
      </div>
    </div>
  );
}

export default Dashboard;
