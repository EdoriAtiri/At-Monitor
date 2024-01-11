import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSearchParams, useNavigate } from "react-router-dom";
import { getMembers, reset } from "../features/Members/memberSlice";
import Loading from "../components/Loading";
import sortByProperty from "../lib/sortByProperty";
import useSuperUserCheck from "../hooks/useSuperUserCheck";

const SORT_VALUES = [
  {
    display: "name",
    value: "fullName",
  },
  {
    display: "gender",
    value: "gender",
  },
  {
    display: "category",
    value: "category",
  },
  {
    display: "membership",
    value: "membershipStatus",
  },
];

function Members() {
  const [defaultMembers, setDefaultMembers] = useState([]);
  const isSuperUser = useSuperUserCheck();
  const { members, isSuccess, isLoading } = useSelector(
    (state) => state.members,
  );
  const [memberStats, setMemberStats] = useState({
    total: "",
    adults: "",
    teenagersAndChildren: "",
  });

  const { total, adults, teenagersAndChildren } = memberStats;

  const [searchParams, setSearchParams] = useSearchParams({
    q: "",
    sortBy: "",
  });
  const q = searchParams.get("q");
  // Search Params
  const sortBy = searchParams.get("sortBy") || "name";
  // useSearchParams stores values as string, so for booleans and numbers check that you have the val you want

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Triggers the reset reducer function in eventSlice and sets the state back to the initialState object, effectively clearing any data and resetting the flags like isLoading, isSuccess, isError, and message to their initial values.
  useEffect(() => {
    return () => {
      if (isSuccess) {
        dispatch(reset());
      }
    };
  }, [dispatch, isSuccess]);
  // Gets members
  useEffect(() => {
    dispatch(getMembers());
  }, [dispatch]);

  // update default events
  useEffect(() => {
    if (members) {
      setDefaultMembers(members);
    }
  }, [members]);

  // Creates stats when getMembers is successful
  useEffect(() => {
    if (Array.isArray(members)) {
      setMemberStats({
        total: members.length || 0,
        adults:
          members.filter((members) => members.category === "adult").length || 0,
        teenagersAndChildren:
          members.filter(
            (members) =>
              members.category === "teenager" || members.category === "child",
          ).length || 0,
      });
    }
  }, [members]);

  // filter by query
  useEffect(() => {
    const filteredMembers =
      members?.filter((item) => {
        // Check if the item's name includes the provided name (case-insensitive)
        const nameMatch = item?.fullName
          ?.toLowerCase()
          .includes(q?.toLowerCase());
        return nameMatch;
      }) ?? [];

    SORT_VALUES.forEach((val) => {
      if (sortBy === val.display) {
        sortMembers(filteredMembers, val.value);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q, members, sortBy]);

  const sortMembers = (arr, value) => {
    // For sort to work defaultMembers must be an array
    let sortedMembers = [...arr];
    sortedMembers.sort(sortByProperty(value));
    setDefaultMembers(sortedMembers);
  };

  // Sort registrars by SORT_VALUE value if display name matches sortBy
  useEffect(() => {
    SORT_VALUES.forEach((val) => {
      if (sortBy === val.display) {
        sortMembers(defaultMembers, val.value);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortBy]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className=" mx-6 mb-6 mt-10">
      <header className="mb-8 flex items-center justify-between text-xl font-semibold">
        <h1 className="page-heading">Members</h1>
        {isSuperUser && (
          <button
            onClick={() => {
              dispatch(reset());
              navigate("/dashboard/members/create");
            }}
            className="rounded-md border border-gray-700 p-1 text-lg"
          >
            {" "}
            Create New Member
          </button>
        )}
      </header>{" "}
      {/* Admin member Stats */}
      <div className="mb-4 flex gap-4">
        <div className="stats shadow">
          <div className="stat">
            <div className="stat-title">Total Members</div>
            <div className="stat-value text-2xl">{total}</div>
          </div>

          <div className="stat">
            <div className="stat-title">Adults</div>
            <div className="stat-value text-2xl">{adults}</div>
          </div>

          <div className="stat">
            <div className="stat-title">Teens and Children</div>
            <div className="stat-value text-2xl">{teenagersAndChildren}</div>
          </div>
        </div>
      </div>
      {/* Sorting and Filtering */}
      <div className="mb-1 mt-6 flex flex-col gap-3 lg:flex-row lg:gap-6">
        <div className=" flex items-center gap-2">
          <label className="text-sm" htmlFor="q">
            Search
          </label>
          <input
            className="input input-bordered h-8 w-full max-w-xs"
            type="text"
            id="q"
            value={q}
            onChange={(e) =>
              setSearchParams(
                (prev) => {
                  prev.set("q", e.target.value);

                  return prev;
                },
                { replace: true },
              )
            }
          />
        </div>
        {/* sorting */}
        <div className="dropdown dropdown-end flex h-full items-center gap-2 text-sm">
          <label htmlFor="sort" className="">
            Sort By:
          </label>

          <select
            className="capitalize"
            defaultValue={sortBy}
            name="sort"
            id="sort"
            onChange={(e) =>
              setSearchParams(
                (prev) => {
                  prev.set("sortBy", e.target.value);

                  return prev;
                },
                { replace: true },
              )
            }
          >
            {SORT_VALUES.map((val, index) => (
              <option className="capitalize" key={index} value={val.display}>
                {val.display}
              </option>
            ))}{" "}
          </select>
        </div>
      </div>
      {/* Members */}
      <div className="mt-6 overflow-x-auto rounded-lg border shadow-sm">
        <table className="w-full table-auto text-left text-sm">
          <thead className="border-b bg-gray-50 font-medium text-gray-600">
            <tr>
              <th className="px-6 py-3">S/N</th>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Gender</th>
              <th className="px-6 py-3">Category</th>
              <th className="px-6 py-3">Membership</th>
            </tr>
          </thead>
          <tbody className="divide-y text-gray-600">
            {Array.isArray(defaultMembers) ? (
              defaultMembers.map((member, index) => (
                <tr
                  tabIndex="0"
                  className="cursor-pointer capitalize transition-colors hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
                  key={member._id}
                  onClick={() => {
                    navigate(`/dashboard/members/${member._id}`);
                  }}
                >
                  <td className="whitespace-nowrap px-6 py-4">{index + 1}</td>
                  <td className="capit whitespace-nowrap px-6 py-4">
                    {member.fullName}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    {member.gender}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    {member.category}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    {member.membershipStatus}
                  </td>
                </tr>
              ))
            ) : (
              <p>Error loading events...</p>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Members;
