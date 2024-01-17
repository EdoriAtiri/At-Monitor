import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login, reset } from "../features/Auth/authSlice";
import Loading from "../components/Loading";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { admin, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth,
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    // Redirect when logged in
    if (isSuccess || admin) {
      navigate("/dashboard/events");
      console.log("success");
    }

    dispatch(reset());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError, message, isSuccess, admin, navigate]);

  const onChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const data = {
      email,
      password,
    };

    dispatch(login(data));
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex min-h-[calc(100vh-3.5rem)] w-full flex-row bg-blue-950 text-white">
      <div className="flex w-full flex-col items-center gap-6 pt-6 sm:w-1/2 ">
        <div className="w-3/4 space-y-1 text-left lg:w-1/2 [&>*]:w-full">
          <h2 className="text-2xl font-bold tracking-tight lg:text-3xl">
            Login in to AT Monitor
          </h2>
        </div>

        <form
          onSubmit={onSubmit}
          className="w-3/4 space-y-7 lg:w-1/2 [&>*]:w-full"
        >
          <div className="space-y-4">
            <div className="form-group">
              <input
                type="email"
                className="form-input-style"
                id="email"
                name="email"
                value={email}
                onChange={onChange}
                placeholder="Enter your email address"
                required
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-input-style"
                id="password"
                name="password"
                value={password}
                onChange={onChange}
                placeholder="Enter password"
                required
              />
            </div>
          </div>

          <div className="btn mt-36">
            <button className="form-input-style grid place-content-center bg-black font-bold text-white transition-transform active:scale-95">
              Continue
            </button>
          </div>
        </form>

        <span className="text text-sm">
          Don&apos;t have an account?{" "}
          <span className="font-bold text-blue-600">
            <Link to="/signup">Signup</Link>
          </span>
        </span>
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

export default Login;
