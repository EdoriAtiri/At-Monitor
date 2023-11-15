import { Link, Navigate } from "react-router-dom";
import { useAuthStatus } from "../hooks/useAuthStatus";
import Button from "../components/Button";
import Logo from "../components/Logo";

function Home() {
  const { loggedIn } = useAuthStatus();

  return loggedIn ? (
    <Navigate to="/dashboard/events" />
  ) : (
    <div className="flex min-h-screen w-full flex-row">
      <div className="w-1/2 space-y-32 py-10">
        <Logo />
        <div className="m-auto space-y-6 px-10 xl:px-20">
          <h1 className="text-4xl font-bold lg:text-6xl">
            Track Event Attendance{" "}
          </h1>
          <p className="text-sm lg:text-lg">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tenetur ad
            provident, deleniti ipsum molestias illo aut!
          </p>
          <div className="flex flex-row space-x-4 lg:space-x-6 xl:space-x-8">
            <Link to="/signup">
              <Button text="Sign Up" />
            </Link>
            <Link to="/login">
              <Button text="Login" />
            </Link>
          </div>
        </div>
      </div>

      <div className="relative flex w-1/2 flex-col px-10 py-10">
        <ul className="flex h-fit w-full flex-row justify-end gap-6 py-4 text-sm xl:text-base">
          <li className="nav">About</li>
          <li className="nav">Contact</li>
        </ul>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-7xl font-bold">
          <span className="xl text-8xl">A</span>
          <span className="-ml-4">M</span>
        </div>
      </div>
    </div>
  );
}

export default Home;
