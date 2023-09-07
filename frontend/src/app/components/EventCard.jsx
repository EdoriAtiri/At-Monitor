import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import formatDate from '../lib/formatDate'

function EventCard({ name, created, date, registered, id }) {
  const currentDate = new Date()
  const past = currentDate > new Date(date)

  const navigate = useNavigate()

  return (
    <button
      className="w-full"
      onClick={() => {
        navigate(`/dashboard/events/${id}`)
      }}
    >
      <table className="flex w-full lg:w-96 justify-between border border-gray-700 py-2 px-4 lg:p-4 rounded-md">
        <tr className="font-bold flex gap-2 flex-col text-left ">
          <th>Event Name:</th>
          <th>Date Created:</th>
          <th>Event Date:</th>
          <th>Total Registered:</th>
          <th>Status:</th>
        </tr>
        <tr className="flex gap-2 flex-col text-right">
          <td>{name}</td>
          <td>{formatDate(created)}</td>
          <td>{formatDate(date)}</td>
          <td>{registered}</td>
          <td>
            {past ? (
              <span className="bg-green-400 font-bold rounded px-1 py-0.5">
                Finished
              </span>
            ) : (
              <span className="bg-orange-400 font-bold rounded px-1 py-0.5">
                Pending
              </span>
            )}
          </td>
        </tr>
      </table>
    </button>
  )
}

EventCard.propTypes = {
  name: PropTypes.string,
  created: PropTypes.string,
  date: PropTypes.string,
  registered: PropTypes.number,
  id: PropTypes.string,
}

EventCard.defaultProps = {
  name: 'My Event',
  created: '0/0/0',
  date: '0/0/0',
  registered: 0,
}

export default EventCard
