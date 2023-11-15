import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
// import { createEvent } from '../features/Events/eventSlice'

function NewEvent() {
  const [memberData, setMemberData] = useState({
    fullName: "",
    gender: "",
    category: "",
    email: "",
    phone: "",
    address: "",
    dob: "",
    membershipStatus: "",
  });

  const { isError, isLoading, isSuccess, message } = useSelector(
    (state) => state.members,
  );

  // const dispatch = useDispatch()
  // console.log(eventId)

  const {
    fullName,
    gender,
    category,
    email,
    phone,
    address,
    dob,
    membershipStatus,
  } = memberData;

  const onChange = (e) => {
    setMemberData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Submit event data
  // const onSubmit = (e) => {
  //   e.preventDefault()

  //   const data = {
  //     ...memberData,
  //   }
  //   dispatch(createEvent(data))
  //   closeForm()
  // }

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
    <div className="mx-6 mt-10 mb-6">
      <form
        // onSubmit={onSubmit}
        className="space-y-7"
      >
        <div className="space-y-4 lg:space-y-0 flex flex-col lg:flex-row lg:gap-12">
          {/*  */}
          <div className="space-y-4">
            <div className="space-y-2 w-96 lg:w-72">
              <label
                htmlFor="fullName"
                className="text-sm md:text-base lg:text-xl"
              >
                Event Name
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
            <div className="space-y-2 w-96 lg:w-72">
              <label
                htmlFor="email"
                className="text-sm md:text-base lg:text-xl"
              >
                Email
              </label>
              <input
                type="email"
                className="form-input-style pr-2"
                id="email"
                name="email"
                value={email}
                onChange={onChange}
                required
              />
            </div>
            <div className="space-y-2 w-96 lg:w-72">
              <label
                htmlFor="phone"
                className="text-sm md:text-base lg:text-xl"
              >
                Phone No.
              </label>
              <input
                type="tel"
                className="form-input-style pr-2"
                id="phone"
                name="phone"
                value={phone}
                onChange={onChange}
                required
              />
            </div>
            <div className="space-y-2 w-96 lg:w-72">
              <label
                htmlFor="address"
                className="text-sm md:text-base lg:text-xl"
              >
                Address
              </label>
              <input
                type="text"
                className="form-input-style"
                id="address"
                name="address"
                value={address}
                onChange={onChange}
                required
              />
            </div>
            <div className="space-y-2 w-96 lg:w-72">
              <label htmlFor="dob" className="text-sm md:text-base lg:text-xl">
                DOB
              </label>
              <input
                type="date"
                className="form-input-style pr-2"
                id="dob"
                name="dob"
                value={dob}
                onChange={onChange}
                required
              />
            </div>
          </div>
          {/*  */}
          <div className="space-y-4">
            <div className="space-y-2 flex-col flex w-96 lg:w-72">
              <label
                htmlFor="category"
                className="text-sm md:text-base lg:text-xl"
              >
                Category
              </label>
              <select
                className="form-input-style pr-2 py-1"
                name="category"
                id="category"
                value={category}
              >
                <option value="adult">Adult</option>
                <option value="teenager">Teenager</option>
                <option value="child">Child</option>
              </select>
            </div>
            <div className="space-y-2 flex flex-col w-96 lg:w-72">
              <label
                htmlFor="gender"
                className="text-sm md:text-base lg:text-xl"
              >
                Gender
              </label>
              <select
                className="form-input-style pr-2 py-1"
                name="gender"
                id="gender"
                value={gender}
              >
                <option value="male">Male</option>
                <option value="male">Female</option>
                <option value="none">Prefer not to say</option>
              </select>
            </div>
            <div className="space-y-2 flex flex-col w-96 lg:w-72">
              <label
                htmlFor="membershipStatus"
                className="text-sm md:text-base lg:text-xl"
              >
                Membership Status
              </label>
              <select
                className="form-input-style pr-2 py-1"
                name="membershipStatus"
                id="membershipStatus"
                value={membershipStatus}
              >
                <option value="completed">Completed</option>
                <option value="ongoing">Ongoing</option>
                <option value="paused">Paused</option>
                <option value="undone">Undone</option>
              </select>
            </div>
          </div>
        </div>

        <div className="btn mt-36 w-96 lg:72">
          <button className="form-input-style grid place-content-center active:scale-95 transition-transform font-bold text-white bg-black">
            Create Event
          </button>
        </div>
      </form>{" "}
    </div>
  );
}

export default NewEvent;
