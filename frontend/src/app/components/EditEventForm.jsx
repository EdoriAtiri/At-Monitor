import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { editEvent } from "../features/Events/eventSlice";
import { formatDate } from "../lib/formatDate";

function EditEventForm({ eventId, closeEdit }) {
  const [eventData, setEventData] = useState({
    eventName: "",
    eventDate: "",
    description: "",
    linkId: "",
  });

  // const [isInitial, setIsInitial] = useState(true)

  const dispatch = useDispatch();
  // console.log(eventId)

  const { myEvent, isError, isLoading, message } = useSelector(
    (state) => state.myEvents,
  );

  //   If editing event data, get the existing data
  useEffect(() => {
    if (myEvent) {
      setEventData({
        eventName: myEvent.eventName || "1",
        eventDate: myEvent.eventDate || "",
        description: myEvent.description || "",
        linkId: myEvent.linkId || "",
      });
    }
  }, [myEvent]);

  const { eventName, eventDate, description, linkId } = eventData;

  const onChange = (e) => {
    setEventData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const data = {
      ...eventData,
    };
    dispatch(editEvent({ data, eventId }));

    closeEdit();
  };

  // Convert to error and success pop ups
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError, message]);

  if (isLoading) {
    return <div>loading...</div>;
  }

  return (
    <div className="absolute left-0 top-0 z-30 h-screen w-screen">
      <button
        onClick={closeEdit}
        className=" absolute left-0 top-0 h-full w-full bg-black opacity-30"
      ></button>

      <div className="absolute left-1/2 top-1/2 z-10 h-fit w-80 -translate-x-1/2 -translate-y-1/2 transform rounded-2xl bg-white px-6 py-6">
        <button
          onClick={closeEdit}
          className="absolute right-0 top-0 p-1 pr-2 text-lg font-bold uppercase"
        >
          x
        </button>
        <form
          onSubmit={onSubmit}
          className="h-full w-full space-y-7 [&>*]:w-full"
        >
          <div className="space-y-4">
            {/*  */}
            <div className="form-group space-y-2">
              <label
                htmlFor="eventName"
                className="text-sm md:text-base lg:text-xl"
              >
                Event Name
              </label>
              <input
                type="text"
                className="form-input-style"
                id="eventName"
                name="eventName"
                value={eventName}
                onChange={onChange}
                required
                autoFocus
              />
            </div>
            <div className="form-group space-y-2">
              <label
                htmlFor="eventDate"
                className="text-sm md:text-base lg:text-xl"
              >
                Date
              </label>
              <input
                type="date"
                className="form-input-style pr-1"
                id="eventDate"
                name="eventDate"
                value={formatDate(eventDate)}
                onChange={onChange}
                required
              />
            </div>
            <div className="form-group space-y-2">
              <label
                htmlFor="description"
                className="text-sm md:text-base lg:text-xl"
              >
                Description{" "}
              </label>
              <input
                type="text"
                className="form-input-style"
                id="description"
                name="description"
                value={description}
                onChange={onChange}
              />
            </div>
            <div className="form-group space-y-2">
              <label
                htmlFor="linkId"
                className="text-sm md:text-base lg:text-xl"
              >
                Link{" "}
              </label>
              <input
                type="text"
                className="form-input-style"
                id="linkId"
                name="linkId"
                value={linkId}
                onChange={onChange}
              />
            </div>
          </div>

          <div className="btn mt-36">
            <button className="form-input-style grid place-content-center bg-black font-bold text-white transition-transform active:scale-95">
              Edit
            </button>
          </div>
        </form>{" "}
      </div>
    </div>
  );
}

EditEventForm.propTypes = {
  eventId: PropTypes.string,
  closeEdit: PropTypes.func,
};

EditEventForm.defaultProps = {
  eventId: "eventId",
};

export default EditEventForm;
