import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { signup, reset } from "../features/Auth/authSlice";
import Loading from "../components/Loading";

function Signup() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    password2: "",
  });

  const { firstName, lastName, email, password, password2 } = formData;

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

    if (password !== password2) {
      toast.error("passwords do not match");
    } else {
      const data = {
        firstName,
        lastName,
        email,
        password,
      };

      dispatch(signup(data));
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="grid min-h-[calc(100vh-3.5rem)] w-full place-content-center bg-blue-950 text-white sm:flex sm:flex-row">
      <div className="grid place-content-center py-10 sm:w-1/2">
        <div className="flex w-full flex-col items-center gap-6">
          <div className=" space-y-1 [&>*]:w-full">
            <h2 className="text-center text-2xl font-bold tracking-tight lg:text-3xl">
              Lets create your account
            </h2>
            <p className="text-sm opacity-80">
              Signing up for AT Monitor is fast and 100% free
            </p>
          </div>

          <form
            onSubmit={onSubmit}
            className=" w-full space-y-7 text-black [&>*]:w-full"
          >
            <div className="space-y-4">
              <div className="form-group">
                <input
                  type="text"
                  className="form-input-style"
                  id="firstName"
                  name="firstName"
                  value={firstName}
                  onChange={onChange}
                  placeholder="Enter your first name"
                  required
                />
              </div>

              <div className="form-group">
                <input
                  type="text"
                  className="form-input-style"
                  id="lastName"
                  name="lastName"
                  value={lastName}
                  onChange={onChange}
                  placeholder="Enter your last name"
                  required
                />
              </div>
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
              <div className="form-group">
                <input
                  type="password"
                  className="form-input-style"
                  id="password2"
                  name="password2"
                  value={password2}
                  onChange={onChange}
                  placeholder="Confirm password"
                  required
                />
              </div>
            </div>

            <div className="mt-36">
              <button className="form-input-style grid place-content-center bg-black font-bold text-white transition-transform active:scale-95">
                Continue
              </button>
            </div>
          </form>

          <span className="text text-sm">
            <span className="italic">Already have an account? </span>
            <span className="relative text-base font-bold text-blue-50 underline decoration-blue-200">
              <Link to="/login">Login</Link>
            </span>
          </span>
        </div>
      </div>

      <div className="relative hidden flex-col px-10 py-10 sm:flex sm:w-1/2">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-7xl font-bold">
          <span className="xl text-8xl">A</span>
          <span className="-ml-4">M</span>
        </div>
      </div>
    </div>
  );
}

export default Signup;
