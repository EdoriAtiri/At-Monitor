import Logo from "./Logo";
import { Outlet } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <header className="flex h-14 w-full items-center justify-between px-10 xl:px-20">
        {/* Logo */}
        <div>
          <Logo />
        </div>

        <ul className="flex h-full flex-row gap-6 py-4 text-base font-semibold">
          <li className="nav cursor-pointer">About</li>
          <li className="nav cursor-pointer">Contact</li>
        </ul>
      </header>

      {/* Outlet */}
      <div className="w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default Header;
