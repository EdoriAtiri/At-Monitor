import Logo from "./Logo";
import { Outlet } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <div>
        <Logo />
      </div>

      {/* Outlet */}
      <div className="w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default Header;
