import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { createMember } from "../features/Members/memberSlice";

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

  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  // Submit members data
  const onSubmit = (e) => {
    e.preventDefault();

    const data = {
      ...memberData,
    };

    dispatch(createMember(data));
  };

  useEffect(() => {
    // Check if isSuccess is true, then navigate
    if (isSuccess) {
      navigate("/dashboard/members");
      toast.success("Member created successfully");
    }

    // Handle errors if any
    if (isError) {
      toast.error(message);
    }
  }, [isSuccess, isError, message, navigate]);

  if (isLoading) {
    return <div>loading...</div>;
  }

  return (
    <div className="mx-6 mb-6 mt-10">
      <form onSubmit={onSubmit} className="space-y-7">
        <div className="flex flex-col space-y-4 lg:flex-row lg:gap-12 lg:space-y-0">
          {/*  */}
          <div className="space-y-4">
            <div className="w-96 space-y-2 lg:w-72">
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
            <div className="w-96 space-y-2 lg:w-72">
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
            <div className="w-96 space-y-2 lg:w-72">
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
            <div className="w-96 space-y-2 lg:w-72">
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
            <div className="w-96 space-y-2 lg:w-72">
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
            <div className="flex w-96 flex-col space-y-2 lg:w-72">
              <label
                htmlFor="category"
                className="text-sm md:text-base lg:text-xl"
              >
                Category
              </label>
              <select
                onChange={onChange}
                className="form-input-style py-1 pr-2"
                name="category"
                id="category"
                value={category}
              >
                <option value="" disabled defaultValue hidden>
                  Select Category
                </option>
                <option value="adult">Adult</option>
                <option value="teenager">Teenager</option>
                <option value="child">Child</option>
              </select>
            </div>
            <div className="flex w-96 flex-col space-y-2 lg:w-72">
              <label
                htmlFor="gender"
                className="text-sm md:text-base lg:text-xl"
              >
                Gender
              </label>
              <select
                onChange={onChange}
                className="form-input-style py-1 pr-2"
                name="gender"
                id="gender"
                value={gender}
              >
                <option value="" disabled defaultValue hidden>
                  Select Gender
                </option>

                <option value="male">Male</option>
                <option value="male">Female</option>
                <option value="none">Prefer not to say</option>
              </select>
            </div>
            <div className="flex w-96 flex-col space-y-2 lg:w-72">
              <label
                htmlFor="membershipStatus"
                className="text-sm md:text-base lg:text-xl"
              >
                Membership Status
              </label>
              <select
                onChange={onChange}
                className="form-input-style py-1 pr-2"
                name="membershipStatus"
                id="membershipStatus"
                value={membershipStatus}
              >
                <option value="" disabled defaultValue hidden>
                  Select Membership Status
                </option>
                <option value="completed">Completed</option>
                <option value="ongoing">Ongoing</option>
                <option value="paused">Paused</option>
                <option value="undone">None</option>
              </select>
            </div>
          </div>
        </div>

        <div className="lg:72 btn mt-36 w-96">
          <button className="form-input-style grid place-content-center bg-black font-bold text-white transition-transform active:scale-95">
            Create
          </button>
        </div>
      </form>{" "}
    </div>
  );
}

export default NewEvent;
