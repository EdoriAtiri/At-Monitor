import PropTypes from 'prop-types'

function EventCard({ name, created, date, registered, onClickBtn }) {
  const currentDate = new Date()
  const past = currentDate > new Date(date)

  const formatDate = (inputDate) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return inputDate.toLocaleDateString('en-GB', options)
  }

  return (
    <button className="w-full" onClick={onClickBtn}>
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
          <td>{formatDate(new Date(created))}</td>
          <td>{formatDate(new Date(date))}</td>
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
  onClickBtn: PropTypes.func,
}

EventCard.defaultProps = {
  name: 'My Event',
  created: '0/0/0',
  date: '0/0/0',
  registered: 0,
}

export default EventCard
