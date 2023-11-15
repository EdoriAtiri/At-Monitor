import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { getRegistrars, reset } from "../features/Registrars/registrarSlice";
import RegistrarCard from "../components/RegistrarCard";
import Loading from "../components/Loading";
import NewRegistrar from "../components/NewRegistrar";
import sortByProperty from "../lib/sortByProperty";

// const SORT_VALUES = ['date created', 'name', 'status']
const SORT_VALUES = [
  {
    display: "date created",
    value: "createdAt",
  },
  {
    display: "name",
    value: "fullName",
  },
  {
    display: "status",
    value: "isActivated",
  },
];

const Registrars = () => {
  const [defaultRegistrars, setDefaultRegistrars] = useState([]);
  // const [sortValue, setSortValue] = useState('date created')
  const [isForm, setIsForm] = useState(false);
  // Search Params
  const [searchParams, setSearchParams] = useSearchParams({
    activeOnly: false,
    q: "",
    sortBy: "",
  });
  const q = searchParams.get("q");
  const activeOnly = searchParams.get("activeOnly") === "true";
  // Search Params
  const sortBy = searchParams.get("sortBy") || "date created";
  // useSearchParams stores values as string, so for booleans and numbers check that you have the val you want

  const { registrars, isSuccess, isLoading } = useSelector(
    (state) => state.registrars,
  );
  const [registrarStats, setRegistrarStats] = useState({
    total: "",
    active: "",
    inactive: "",
  });
  // const { isAddRegistrar, setIsAddRegistrar } = useState(false)
  const { total, active, inactive } = registrarStats;
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      if (isSuccess) {
        dispatch(reset());
      }
    };
  }, [dispatch, isSuccess]);

  // Gets Registrars on mount
  useEffect(() => {
    dispatch(getRegistrars());
  }, [dispatch]);

  // update default registrars
  useEffect(() => {
    if (registrars) {
      setDefaultRegistrars(registrars);
    }
  }, [registrars]);

  // Creates stats when getRegistrars is successful
  useEffect(() => {
    if (Array.isArray(registrars)) {
      setRegistrarStats({
        total: registrars.length || 0,
        active:
          registrars.filter((registrar) => registrar.isActivated).length || 0,
        inactive:
          registrars.filter((registrar) => !registrar.isActivated).length || 0,
      });
    }
  }, [registrars]);

  // filter by query or activeOnly or query and activeOnly
  useEffect(() => {
    const filteredRegistrars =
      registrars?.filter((item) => {
        // Check if the item's name includes the provided name (case-insensitive)
        const nameMatch = item?.fullName
          ?.toLowerCase()
          .includes(q?.toLowerCase());

        // Check if the item's activation status matches the provided isActive value
        const activationMatch = activeOnly
          ? item.isActivated
          : item.isActivated || !item.isActivated;

        // Return true if both conditions are met
        return nameMatch && activationMatch;
      }) ?? [];

    SORT_VALUES.forEach((val) => {
      if (sortBy === val.display) {
        sortRegistrars(filteredRegistrars, val.value);
      }
    });
  }, [activeOnly, q, registrars, sortBy]);

  const sortRegistrars = (arr, value) => {
    // For sort to work defaultRegistrars must be an array
    const sortedRegistrars = [...arr];
    sortedRegistrars.sort(sortByProperty(value));
    // SortbyProperty returns inactive registrars first, the reverse method flips that
    if (value === "isActivated") sortedRegistrars.reverse();
    setDefaultRegistrars(sortedRegistrars);
  };

  // Sort registrars by SORT_VALUE value if display name matches sortBy
  useEffect(() => {
    SORT_VALUES.forEach((val) => {
      if (sortBy === val.display) {
        sortRegistrars(defaultRegistrars, val.value);
      }
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortBy]);

  // Loading Screen
  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="mx-6 mb-6 mt-10">
      {" "}
      {isForm && <NewRegistrar closeForm={() => setIsForm(false)} />}
      <header className="flex items-center justify-between text-xl font-semibold">
        <h1>Registrars</h1>
        <button
          onClick={() => setIsForm(true)}
          className="rounded-md border border-gray-700 p-1 text-lg"
        >
          Add Registrar
        </button>
      </header>{" "}
      {/* Registrar Stats */}
      <div className="mt-8 flex gap-4">
        <div className="stats shadow">
          <div className="stat">
            <div className="stat-title">Total Registrars</div>
            <div className="stat-value text-2xl">{total}</div>
          </div>

          <div className="stat">
            <div className="stat-title">Active</div>
            <div className="stat-value text-2xl">{active}</div>
          </div>

          <div className="stat">
            <div className="stat-title">Inactive</div>
            <div className="stat-value text-2xl">{inactive}</div>
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
        {/* Active and sort */}
        <div className="flex h-8 items-center gap-3 lg:gap-6">
          {/* active only */}
          <div className="flex h-full items-center gap-2">
            <label className="text-sm" htmlFor="activeOnly">
              Active Only
            </label>{" "}
            <input
              className=""
              type="checkbox"
              id="activeOnly"
              checked={activeOnly}
              onChange={(e) =>
                setSearchParams(
                  (prev) => {
                    prev.set("activeOnly", e.target.checked);

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
      </div>
      {/* Registrars */}
      <section className="mt-6 flex w-full  flex-col gap-8">
        {Array.isArray(defaultRegistrars) ? (
          defaultRegistrars.map((registrar) => (
            <RegistrarCard
              name={registrar.fullName}
              createdAt={registrar.createdAt}
              status={registrar.isActivated}
              key={registrar._id}
              id={registrar._id}
            />
          ))
        ) : (
          <p>An error occurred while loading registars</p>
        )}
      </section>
    </div>
  );
};

export default Registrars;
