import { useEffect, useState } from "react";
import { formatDateDisplay } from "../lib/formatDate";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  getEvent,
  deleteEvent,
  resetEventState,
} from "../features/Events/eventSlice";
import EditEventForm from "../components/EditEventForm";
import ActConfirmation from "../components/ActConfirmation";
import Loading from "../components/Loading";
import EventRegister from "../components/EventRegister";
import useSuperUserCheck from "../hooks/useSuperUserCheck";
// import { FaPlus } from "react-icons/fa6";

function Event() {
  const [isDeletePrompt, setIsDeletePrompt] = useState(false);
  const [editEvent, setEditEvent] = useState(false);
  const isSuperUser = useSuperUserCheck();
  const { myEvent, isLoading, isError, message, isSuccess } = useSelector(
    (state) => state.myEvents,
  );
  const { admin } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { eventId } = useParams();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    dispatch(getEvent(eventId));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError, message, eventId]);

  if (isLoading) {
    return <Loading />;
  }

  // Open edit event form
  const openEdit = () => {
    setEditEvent(true);
  };

  // Delete Event
  const onDeleteEvent = () => {
    dispatch(resetEventState());
    dispatch(deleteEvent(eventId));

    if (isSuccess) {
      navigate("/dashboard/events");
    }

    if (isError) {
      setIsDeletePrompt(false);
      toast.error(message);
    }
  };

  return (
    <div className="mx-6 mb-6 mt-10">
      {/* Edit event form */}
      {editEvent && (
        <EditEventForm
          eventId={eventId}
          closeEdit={() => setEditEvent(false)}
        />
      )}
      {/* Confirm Delete prompt */}
      {isDeletePrompt && (
        <ActConfirmation
          action={`delete ${myEvent.eventName} ?`}
          title="delete"
          onClickBtn={onDeleteEvent}
          onClickCancel={() => setIsDeletePrompt(false)}
        />
      )}
      <h1 className="mb-5 text-3xl uppercase">{myEvent.eventName}</h1>
      {/* Stat for creator and date */}
      <div className="mb-4 flex gap-4">
        <div className="stats shadow">
          <div className="stat">
            <div className="stat-title">Created By</div>
            <div className="stat-value text-2xl">
              {`${admin.firstName} ${admin.lastName}`}
            </div>
          </div>

          <div className="stat">
            <div className="stat-title">Event Date</div>
            <div className="stat-value text-2xl">
              {formatDateDisplay(myEvent.eventDate)}
            </div>
          </div>
        </div>

        {/* Actions */}
        {isSuperUser && (
          <div className="flex items-center gap-3">
            <button
              onClick={openEdit}
              className="rounded-md border border-gray-700 p-1 text-lg"
            >
              Edit
            </button>
            <button
              onClick={() => setIsDeletePrompt(true)}
              className="rounded-md border border-gray-700 p-1 text-lg"
            >
              Delete
            </button>
          </div>
        )}
      </div>
      {/* Table for description and link */}
      <table className="table">
        <thead>
          <tr className="font-bold">
            <th>Link</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr className="">
            <td>{myEvent.linkId}</td>
            <td>{myEvent.description}</td>
          </tr>
        </tbody>
      </table>{" "}
      {/* Registered attendees */}
      <section className="mt-8">
        {/* <div className="flex justify-between">
          <h2>Registration</h2>
          <button className="grid h-8 w-8 place-content-center rounded-full bg-sky-400 transition-all hover:bg-slate-400 focus:border active:scale-95">
            <FaPlus />
          </button>
        </div> */}
        <EventRegister />
      </section>
    </div>
  );
}

export default Event;
