import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  getRegForActivation,
  createRegAuth,
} from "../features/Registrars/registrarSlice";
import Loading from "../components/Loading";

const RegistrarActivation = () => {
  const [pass, setPass] = useState("");
  const { registrar, isError, message, isLoading, isSuccess } = useSelector(
    (state) => state.registrars,
  );

  const dispatch = useDispatch();
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getRegForActivation(token));

    if (isError) {
      toast.error(message);
    }
    console.log(registrar);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError, message, token]);

  const onSubmit = (e) => {
    e.preventDefault();
    const data = { password: pass };
    dispatch(createRegAuth({ data, id: registrar._id }));

    if (isSuccess) navigate("/login");
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <main className="flex h-screen w-full flex-col items-center justify-center px-4">
      <div className="w-full max-w-sm text-gray-600">
        <div className="flex items-center justify-center gap-2 text-center">
          <div className="text-2xl font-bold">
            <span className="text-3xl">A</span>
            <span className="-ml-2">M</span>
          </div>{" "}
          <div className="space-y-2">
            <h3 className="s text-2xl font-bold text-gray-800">Sign up</h3>
          </div>
        </div>
        <p className="text-center text-xl">
          Complete Your Registration {registrar.fullName}
        </p>
        <form className="mt-8 space-y-5">
          <div>
            <label className="font-medium">Email</label>
            <input
              type="email"
              disabled
              value={registrar.email}
              className="mt-2 w-full rounded-lg border bg-transparent px-3 py-2 text-gray-500 shadow-sm outline-none focus:border-indigo-600"
            />
          </div>
          <div>
            <label className="font-medium">Password</label>
            <input
              type="password"
              required
              min="8"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              placeholder="enter a password"
              className="mt-2 w-full rounded-lg border bg-transparent px-3 py-2 text-gray-500 shadow-sm outline-none focus:border-indigo-600"
            />
          </div>
          <button
            onClick={onSubmit}
            className="w-full rounded-lg bg-indigo-600 px-4 py-2 font-medium text-white duration-150 hover:bg-indigo-500 active:bg-indigo-600"
          >
            Create account
          </button>
        </form>
      </div>
    </main>
  );
};

export default RegistrarActivation;
