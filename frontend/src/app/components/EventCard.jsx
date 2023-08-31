import PropTypes from 'prop-types'

function EventCard({ name, created, date, registered, onClickBtn }) {
  return (
    <button className="w-full" onClick={onClickBtn}>
      <table className="mt-8 flex gap-6 w-full lg:w-96 justify-between border border-gray-700 py-2 px-4 lg:p-4 rounded-md">
        <tr className="font-bold flex gap-4 flex-col text-left ">
          <th>Event Name:</th>
          <th>Date Created:</th>
          <th>Event Date:</th>
          <th>Total Registered:</th>
        </tr>
        <tr className="flex gap-4 flex-col text-right">
          <td>{name}</td>
          <td>{created}</td>
          <td>{date}</td>
          <td>{registered}</td>
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
  onClickBtn: PropTypes.func,
}

EventCard.defaultProps = {
  name: 'My Event',
  created: '0/0/0',
  date: '0/0/0',
  registered: 0,
}

export default EventCard
