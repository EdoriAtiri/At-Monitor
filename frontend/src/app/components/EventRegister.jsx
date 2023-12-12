import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateEventRegister } from "../features/Events/eventSlice";
import { FaPlus } from "react-icons/fa6";
import Loading from "./Loading";
import { FaMale, FaFemale } from "react-icons/fa";
import SearchMembers from "./SearchMembers";

const EventRegister = () => {
  const [isRegistrationForm, setIsRegistrationForm] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    firstTimer: "",
    gender: "",
    memberId: "",
  });
  const { fullName, email, phone, firstTimer, gender } = formData;
  const { myEvent, isLoading } = useSelector((state) => state.myEvents);

  const dispatch = useDispatch();

  const onChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = () => {
    if (!formData.memberId) delete formData.memberId;

    const data = { data: formData, eventId: myEvent._id };
    dispatch(updateEventRegister(data));
  };

  const closeForm = () => {
    setIsRegistrationForm(false);
    document.body.style.overflow = "auto";
  };

  const setMemberInput = (val) => {
    console.log(val);
    setFormData({
      fullName: val.fullName,
      email: val.email,
      phone: val.phone,
      gender: val.gender,
      firstTimer: false,
    });
  };

  const registerPerson = () => {
    setIsRegistrationForm(true);
    window.scrollTo(0, 0);
    document.body.style.overflow = "hidden";
  };
  return (
    // Actions
    <div className="">
      {isLoading && <Loading />}
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-xl font-bold text-gray-800">Registered</h4>
        </div>
        <button
          onClick={registerPerson}
          className="grid h-8 w-8 place-content-center rounded-full bg-sky-400 transition-all hover:bg-slate-400 focus:border active:scale-95"
        >
          <FaPlus />
        </button>{" "}
      </div>

      {/* List of registered*/}
      <div className="mt-6 overflow-x-auto rounded-lg border shadow-sm">
        <table className="w-full table-auto text-left text-sm">
          <thead className="border-b bg-gray-50 font-medium text-gray-600">
            <tr>
              <th className="px-6 py-3">S/N</th>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Phone No</th>
              <th className="px-6 py-3">First Time</th>
              <th className="px-6 py-3">Gender</th>
            </tr>
          </thead>
          <tbody className="divide-y text-gray-600">
            {Array.isArray(myEvent.registered) &&
            myEvent.registered.length > 0 ? (
              myEvent.registered.map((item, index) => (
                <tr
                  className="cursor-pointer capitalize transition-colors hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
                  key={index}
                >
                  <td className="whitespace-nowrap px-6 py-4">{index + 1}</td>
                  <td className="capit whitespace-nowrap px-6 py-4">
                    {item.fullName}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">{item.email}</td>
                  <td className="whitespace-nowrap px-6 py-4">{item.phone}</td>
                  <td className="whitespace-nowrap px-6 py-4">
                    {item.firstTimer ? "Yes" : "No"}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    {item.gender === "male" ? (
                      <FaMale className="text-blue-500" size="1.35em" />
                    ) : (
                      <FaFemale className="text-pink-500" size="1.35em" />
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <div>No registered user</div>
            )}
          </tbody>
        </table>
      </div>

      {/* update register */}
      {isRegistrationForm && (
        <div className="absolute left-0 top-0 z-30  h-screen w-screen">
          <button
            onClick={closeForm}
            className="fixed left-0 top-0 h-full w-full bg-black opacity-30"
          ></button>

          <div className="absolute left-1/2 top-1/2  h-fit w-80 -translate-x-1/2 -translate-y-1/2 transform rounded-2xl bg-white px-6 py-6">
            <button
              onClick={closeForm}
              className="absolute right-0 top-0 p-1 pr-2 text-lg font-bold uppercase"
            >
              x
            </button>

            {/* Search Member Form */}
            <SearchMembers setMemberInput={setMemberInput} />

            {/* Registration Form */}
            <form
              onSubmit={onSubmit}
              className="h-full w-full space-y-7 [&>*]:w-full"
            >
              {/*  */}
              <div className="space-y-2">
                <input
                  type="text"
                  className="form-input-style placeholder:text-gray-700"
                  id="fullName"
                  name="fullName"
                  value={fullName}
                  onChange={onChange}
                  required
                  placeholder="Full Name"
                />
              </div>

              <div className="space-y-2">
                <input
                  type="email"
                  className="form-input-style placeholder:text-gray-700"
                  id="email"
                  name="email"
                  value={email}
                  onChange={onChange}
                  required
                  placeholder="Email"
                />
              </div>

              <div className="space-y-2">
                <input
                  type="tel"
                  className="form-input-style placeholder:text-gray-700"
                  id="phone"
                  name="phone"
                  value={phone}
                  onChange={onChange}
                  required
                  placeholder="Phone Number"
                />
              </div>

              <div className="space-y-2">
                <select
                  onChange={onChange}
                  className="form-input-style py-1 pr-2 text-gray-700"
                  name="firstTimer"
                  id="firstTimer"
                  value={firstTimer}
                >
                  <option value="" disabled defaultValue hidden>
                    Is This Their First Time ?
                  </option>
                  <option value={true}>Yes</option>
                  <option value={false}>No</option>
                </select>
              </div>

              <div className="space-y-2">
                <select
                  onChange={onChange}
                  className="form-input-style py-1 pr-2 text-gray-700"
                  name="gender"
                  id="gender"
                  value={gender}
                >
                  <option value="" disabled defaultValue hidden>
                    Gender
                  </option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>

              <div className="btn mt-36">
                <button className="form-input-style grid place-content-center bg-black px-2 font-bold text-white transition-transform active:scale-95">
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventRegister;
