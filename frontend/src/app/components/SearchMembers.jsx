import { useSelector, useDispatch } from "react-redux";
import { getMembers, reset } from "../features/Members/memberSlice";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { useEffect, useState } from "react";

const SearchMembers = () => {
  const [query, setQuery] = useState("");
  const { members } = useSelector((state) => state.members);

  const dispatch = useDispatch();

  const onChange = (e) => {
    setQuery(e.target.value);
    console.log(query);
    if (!members || members.length === 0) {
      dispatch(getMembers());
    }
  };

  useEffect(() => {
    console.log(members);
  }, [members]);

  return (
    <div className="relative mb-8">
      <div className="relative">
        <FaMagnifyingGlass
          className="
                  absolute
                  bottom-0
                  left-3
                  top-0
                  my-auto
                  h-6
                  w-6
                  text-indigo-500"
        />
        <input
          onChange={onChange}
          value={query}
          type="text"
          placeholder="Search Member"
          className="w-full rounded-md border bg-gray-50 py-3 pl-12 pr-4 font-semibold text-gray-500 outline-none  focus:border-indigo-500 focus:bg-white"
        />
      </div>

      {/* Results */}
      <div className="absolute z-20 flex h-fit w-full flex-col rounded-md border bg-gray-50 pl-3 pr-4 text-sm font-semibold">
        {members || members.length > 0 ? (
          members.slice(0, 10).map((member) => (
            <span key={member._id} className="border-b py-2.5">
              {member.fullName}
            </span>
          ))
        ) : (
          <p>member not found</p>
        )}
      </div>
    </div>
  );
};

export default SearchMembers;
