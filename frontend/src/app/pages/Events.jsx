import EventCard from '../components/EventCard'

function Events() {
  return (
    <div className="w-full mx-6 mt-10 mb-6">
      <heading className="flex items-center justify-between text-xl font-semibold">
        <h1>My Events</h1>
        <button className="text-lg border border-gray-700 p-1 rounded-md">
          Create New Event
        </button>
      </heading>{' '}
      {/* Admin Event Stats */}
      <div className="">
        <h2 className="mt-8 mb-3 text-lg font-semibold">Stats</h2>
        <table className="flex w-full justify-between">
          <tr className="flex flex-col border border-gray-700 p-2 lg:p-4 rounded-md font-bold items-center text-gray-800">
            <th className=" text-lg">Total Events</th>
            <tr className="">0</tr>
          </tr>
          <tr className="flex flex-col border border-gray-700 p-2 lg:p-4 rounded-md font-bold items-center text-gray-800">
            <th className=" text-lg">Pending Events</th>
            <tr>0</tr>
          </tr>
          <tr className="flex flex-col border border-gray-700 p-2 lg:p-4 rounded-md font-bold items-center text-gray-800">
            <th className=" text-lg">Completed Events</th>
            <tr>0</tr>
          </tr>
        </table>
      </div>
      {/* Events */}
      <section className="w-full">
        <EventCard />
      </section>
    </div>
  )
}

export default Events
