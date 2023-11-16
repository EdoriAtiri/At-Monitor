import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { formatDateDisplay } from "../lib/formatDate";

function EventCard({ name, created, date, registered, id }) {
  const currentDate = new Date();
  const past = currentDate > new Date(date);

  const navigate = useNavigate();

  return (
    <button
      className="w-full"
      onClick={() => {
        navigate(`/dashboard/events/${id}`);
      }}
    >
      <table className="flex w-full justify-between rounded-md border border-gray-700 px-4 py-2 lg:w-96 lg:p-4">
        <thead>
          <tr className="flex flex-col gap-2 text-left font-bold ">
            <th>Event Name:</th>
            <th>Date Created:</th>
            <th>Event Date:</th>
            <th>Total Registered:</th>
            <th>Status:</th>
          </tr>
        </thead>
        <tbody>
          <tr className="flex flex-col gap-2 text-right">
            <td>{name}</td>
            <td>{formatDateDisplay(created)}</td>
            <td>{formatDateDisplay(date)}</td>
            <td>{registered}</td>
            <td>
              {past ? (
                <span className="rounded bg-green-400 px-1 py-0.5 font-bold">
                  Finished
                </span>
              ) : (
                <span className="rounded bg-orange-400 px-1 py-0.5 font-bold">
                  Pending
                </span>
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </button>
  );
}

EventCard.propTypes = {
  name: PropTypes.string,
  created: PropTypes.string,
  date: PropTypes.string,
  registered: PropTypes.number,
  id: PropTypes.string,
};

EventCard.defaultProps = {
  name: "My Event",
  created: "0/0/0",
  date: "0/0/0",
  registered: 0,
};

export default EventCard;
