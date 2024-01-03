import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getEvents, resetEventState } from "../features/Events/eventSlice";
import EventCard from "../components/EventCard";
import NewEvent from "../components/NewEvent";
import Loading from "../components/Loading";
import sortByProperty from "../lib/sortByProperty";

const SORT_VALUES = [
  {
    display: "date created",
    value: "createdAt",
  },
  {
    display: "event date",
    value: "eventDate",
  },
  {
    display: "name",
    value: "eventName",
  },
  {
    display: "finished",
    value: "finished",
  },
  {
    display: "pending",
    value: "pending",
  },
];

function Events() {
  const [defaultEvents, setDefaultEvents] = useState([]);
  const [isNewEvent, setIsNewEvent] = useState(false);
  const { myEvents, isSuccess, isLoading, isError, message } = useSelector(
    (state) => state.myEvents,
  );
  const [eventStats, setEventStats] = useState({
    total: "",
    pending: "",
    past: "",
  });

  const { total, pending, past } = eventStats;

  const [searchParams, setSearchParams] = useSearchParams({
    q: "",
    sortBy: "",
  });
  const q = searchParams.get("q");
  // Search Params
  const sortBy = searchParams.get("sortBy") || "date created";
  // useSearchParams stores values as string, so for booleans and numbers check that you have the val you want

  const dispatch = useDispatch();

  // Triggers the reset reducer function in eventSlice and sets the state back to the initialState object, effectively clearing any data and resetting the flags like isLoading, isSuccess, isError, and message to their initial values.
  useEffect(() => {
    return () => {
      if (isSuccess) {
        dispatch(resetEventState());
      }
    };
  }, [dispatch, isSuccess]);

  // Gets events data
  useEffect(() => {
    dispatch(getEvents());
  }, [dispatch]);

  // update default events
  useEffect(() => {
    if (myEvents) {
      setDefaultEvents(myEvents);
    }
  }, [myEvents]);

  // Creates stats when getEvents is successful
  useEffect(() => {
    const currentDate = new Date();

    if (Array.isArray(myEvents)) {
      setEventStats({
        total: myEvents.length || 0,
        pending:
          myEvents.filter((event) => new Date(event.eventDate) > currentDate)
            .length || 0,
        past:
          myEvents.filter((event) => new Date(event.eventDate) < currentDate)
            .length || 0,
      });
    }
  }, [myEvents]);

  // filter by query
  useEffect(() => {
    const filteredEvents =
      (Array.isArray(myEvents)
        ? myEvents.filter((item) => {
            // Check if the item's name includes the provided name (case-insensitive)
            const nameMatch = item?.eventName
              ?.toLowerCase()
              .includes(q?.toLowerCase());
            return nameMatch;
          })
        : []) ?? [];

    SORT_VALUES.forEach((val) => {
      if (sortBy === val.display) {
        sortEvents(filteredEvents, val.value);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q, myEvents, sortBy]);

  const sortEvents = (arr, value) => {
    // For sort to work defaultEvents must be an array
    let sortedEvents = [...arr];
    const currentDate = new Date();

    const pendingEvents = sortedEvents.filter(
      (event) => new Date(event.eventDate) > currentDate,
    );
    const finishedEvents = sortedEvents.filter(
      (event) => new Date(event.eventDate) < currentDate,
    );

    if (sortBy !== "finished" || sortBy !== "pending") {
      sortedEvents.sort(sortByProperty(value));
      if (sortBy === "event date") sortedEvents.reverse();
      // SortbyProperty returns inactive Events first, the reverse method flips that
    }

    // Sort by pending or finished
    if (sortBy === "finished") {
      sortedEvents = [...finishedEvents, ...pendingEvents];
    }
    if (sortBy === "pending")
      sortedEvents = [...pendingEvents, ...finishedEvents];

    setDefaultEvents(sortedEvents);
  };

  // Sort registrars by SORT_VALUE value if display name matches sortBy
  useEffect(() => {
    SORT_VALUES.forEach((val) => {
      if (sortBy === val.display) {
        sortEvents(defaultEvents, val.value);
      }
    });
    console.log(sortBy);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortBy]);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError, message]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className=" mx-6 mb-6 mt-10">
      {isNewEvent && <NewEvent closeForm={() => setIsNewEvent(false)} />}
      <header className="flex items-center justify-between text-xl font-semibold">
        <h1>My Events</h1>
        <button
          onClick={() => setIsNewEvent(true)}
          className="rounded-md border border-gray-700 p-1 text-lg"
        >
          Create New Event
        </button>
      </header>{" "}
      {/* Admin Event Stats */}
      <div className="mb-4 mt-8 flex gap-4">
        <div className="stats shadow">
          <div className="stat">
            <div className="stat-title">Total Events</div>
            <div className="stat-value text-2xl">{total}</div>
          </div>

          <div className="stat">
            <div className="stat-title">Pending Events</div>
            <div className="stat-value text-2xl">{pending}</div>
          </div>

          <div className="stat">
            <div className="stat-title">Past Events</div>
            <div className="stat-value text-2xl">{past}</div>
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
      {/* Events */}
      <section className="mt-8 flex w-full flex-col gap-8">
        {Array.isArray(defaultEvents) ? (
          defaultEvents.map((event) => (
            <EventCard
              name={event.eventName}
              created={event.createdAt}
              date={event.eventDate}
              registered={event.registered.length || 0}
              key={event.linkId}
              id={event._id}
            />
          ))
        ) : (
          <p>Error loading events...</p>
        )}
      </section>
    </div>
  );
}

export default Events;
