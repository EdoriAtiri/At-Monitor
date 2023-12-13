import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { getMembers, reset } from "../features/Members/memberSlice";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { useEffect, useState } from "react";

const SearchMembers = ({ setMemberInput }) => {
  const [query, setQuery] = useState("");
  const [filteredMembers, setFilteredMembers] = useState([]);
  const { members, isSuccess } = useSelector((state) => state.members);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isSuccess) {
      dispatch(reset());
    }
  }, [dispatch, isSuccess]);

  const onChange = (e) => {
    setQuery(e.target.value);
    if (!members || members.length === 0) {
      dispatch(getMembers());
    }
  };

  useEffect(() => {
    if (query) {
      const filteredResult =
        members?.filter((item) => {
          // Check if the item's name includes the provided name (case-insensitive)
          const nameMatch = item?.fullName
            ?.toLowerCase()
            .includes(query?.toLowerCase());
          return nameMatch;
        }) ?? [];

      setFilteredMembers(filteredResult);
    }
  }, [members, query]);

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
      {query && filteredMembers && (
        <div className="absolute z-20 flex h-fit w-full flex-col rounded-md border bg-gray-50  text-sm font-semibold">
          {filteredMembers.length > 0 ? (
            filteredMembers.slice(0, 10).map((member) => (
              <button
                onClick={() => {
                  setQuery("");
                  setMemberInput(member);
                }}
                key={member._id}
                className="border-b px-3 py-2.5 text-left hover:bg-gray-100"
              >
                {member.fullName}
              </button>
            ))
          ) : (
            <p>member not found</p>
          )}
        </div>
      )}
    </div>
  );
};

SearchMembers.propTypes = {
  setMemberInput: PropTypes.func,
};

export default SearchMembers;
