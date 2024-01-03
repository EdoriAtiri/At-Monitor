import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  createRegistrar,
  resetRegistrarState,
} from "../features/Registrars/registrarSlice";

function NewRegistrar({ closeForm }) {
  const [registrarData, setRegistrarData] = useState({
    fullName: "",
    email: "",
  });

  const { isError, isLoading, isSuccess, message } = useSelector(
    (state) => state.myEvents,
  );

  const dispatch = useDispatch();

  const { fullName, email } = registrarData;

  const onChange = (e) => {
    setRegistrarData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Submit registrar data
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(resetRegistrarState());

    // const data = {
    //   ...registrarData,
    // }
    dispatch(createRegistrar(registrarData));
    closeForm();
  };

  // Convert to error and success pop ups
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess) {
      console.log("success");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError, message]);

  if (isLoading) {
    return <div>loading...</div>;
  }

  return (
    <div className="absolute left-0 top-0 z-30 h-screen w-screen">
      <button
        onClick={closeForm}
        className=" absolute left-0 top-0 h-full w-full bg-black opacity-30"
      ></button>

      <div className="absolute left-1/2 top-1/2 h-fit w-80 -translate-x-1/2 -translate-y-1/2 transform rounded-2xl bg-white px-6 py-6">
        <button
          onClick={closeForm}
          className="absolute right-0 top-0 p-1 pr-2 text-lg font-bold uppercase"
        >
          x
        </button>
        <form
          onSubmit={onSubmit}
          className="h-full w-full space-y-7 [&>*]:w-full"
        >
          <div className="space-y-4">
            {/*  */}
            <div className="space-y-2">
              <label
                htmlFor="fullName"
                className="text-sm md:text-base lg:text-xl"
              >
                Full Name
              </label>
              <input
                type="text"
                className="form-input-style"
                id="fullName"
                name="fullName"
                value={fullName}
                onChange={onChange}
                required
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm md:text-base lg:text-xl"
              >
                Email{" "}
              </label>
              <input
                type="text"
                className="form-input-style"
                id="email"
                name="email"
                value={email}
                onChange={onChange}
                required
              />
            </div>
          </div>

          <div className="btn mt-36">
            <button className="form-input-style grid place-content-center bg-black font-bold text-white transition-transform active:scale-95">
              Create Registrar
            </button>
          </div>
        </form>{" "}
      </div>
    </div>
  );
}

NewRegistrar.propTypes = {
  closeForm: PropTypes.func,
};

export default NewRegistrar;
