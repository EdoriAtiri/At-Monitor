import { Link, Navigate } from "react-router-dom";
import { useAuthStatus } from "../hooks/useAuthStatus";
import Button from "../components/Button";

function Home() {
  const { loggedIn } = useAuthStatus();

  return loggedIn ? (
    <Navigate to="/dashboard/events" />
  ) : (
    <div className="flex min-h-[calc(100vh-3.5rem)] w-full flex-row bg-blue-950 text-white">
      <div className="grid w-1/2 place-content-center py-10 ">
        <div className="m-auto px-6 lg:px-10 xl:px-20">
          <h1 className="pb-6 text-5xl font-bold lg:text-6xl">
            Track Event Attendance{" "}
          </h1>
          <p className="pb-16 text-base lg:text-lg">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tenetur ad
            provident, deleniti ipsum molestias illo aut!
          </p>
          <div className="flex flex-row space-x-4 lg:space-x-6 xl:space-x-8">
            <Link to="/signup">
              <Button
                customClass={
                  "border-opacity-0 hover:border-opacity-100 hover-border  hover:bg-transparent hover:text-white bg-white text-blue-950"
                }
                text="Sign Up"
              />
            </Link>
            <Link to="/login">
              <Button
                customClass={
                  "hover:bg-white hover:text-blue-950 hover:border-opacity-0"
                }
                text="Login"
              />
            </Link>
          </div>
        </div>
      </div>

      <div className="relative flex w-1/2 flex-col px-10 py-10">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-7xl font-bold">
          <span className="xl text-8xl">A</span>
          <span className="-ml-4">M</span>
        </div>
      </div>
    </div>
  );
}

export default Home;
