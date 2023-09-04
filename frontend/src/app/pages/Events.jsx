import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getEvents, reset } from '../features/Events/eventSlice'
import EventCard from '../components/EventCard'

function Events() {
  const { myEvents, isSuccess } = useSelector((state) => state.myEvents)
  const [eventStats, setEventStats] = useState({
    total: '',
    pending: '',
    past: '',
  })

  const { total, pending, past } = eventStats

  const dispatch = useDispatch()

  // Triggers the reset reducer function in eventSlice and sets the state back to the initialState object, effectively clearing any data and resetting the flags like isLoading, isSuccess, isError, and message to their initial values.
  useEffect(() => {
    return () => {
      if (isSuccess) {
        dispatch(reset())
      }
    }
  }, [dispatch, isSuccess])

  // Gets events data
  useEffect(() => {
    dispatch(getEvents())
  }, [dispatch])

  // Creates stats when getEvents is successful
  useEffect(() => {
    const currentDate = new Date()

    setEventStats({
      total: myEvents.length || 0,
      pending:
        myEvents.filter((event) => new Date(event.eventDate) > currentDate)
          .length || 0,
      past:
        myEvents.filter((event) => new Date(event.eventDate) < currentDate)
          .length || 0,
    })
  }, [myEvents])

  return (
    <div className=" mx-6 mt-10 mb-6">
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
            <tr className="">{total}</tr>
          </tr>
          <tr className="flex flex-col border border-gray-700 p-2 lg:p-4 rounded-md font-bold items-center text-gray-800">
            <th className=" text-lg">Pending Events</th>
            <tr>{pending}</tr>
          </tr>
          <tr className="flex flex-col border border-gray-700 p-2 lg:p-4 rounded-md font-bold items-center text-gray-800">
            <th className=" text-lg">Past Events</th>
            <tr>{past}</tr>
          </tr>
        </table>
      </div>
      {/* Events */}
      <section className="w-full flex flex-col mt-8 gap-6">
        <EventCard />
        <EventCard />
        <EventCard />
      </section>
    </div>
  )
}

export default Events
