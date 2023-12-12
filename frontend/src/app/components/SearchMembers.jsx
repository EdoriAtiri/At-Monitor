import { FaMagnifyingGlass } from "react-icons/fa6";

const SearchMembers = () => {
  return (
    <div>
      {" "}
      <form onSubmit={(e) => e.preventDefault()} className=" mb-8 ">
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
            type="text"
            placeholder="Search Member"
            className="w-full rounded-md border bg-gray-50 py-3 pl-12 pr-4 font-semibold text-gray-500 outline-none  focus:border-indigo-500 focus:bg-white"
          />
        </div>
      </form>
    </div>
  );
};

export default SearchMembers;
