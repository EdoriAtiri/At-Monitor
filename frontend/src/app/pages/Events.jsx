import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getEvents, reset } from '../features/Events/eventSlice'
import EventCard from '../components/EventCard'
import NewEvent from '../components/NewEvent'
import Loading from '../components/Loading'

function Events() {
  const [isNewEvent, setIsNewEvent] = useState(false)
  const { myEvents, isSuccess, isLoading } = useSelector(
    (state) => state.myEvents
  )
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

    if (Array.isArray(myEvents)) {
      setEventStats({
        total: myEvents.length || 0,
        pending:
          myEvents.filter((event) => new Date(event.eventDate) > currentDate)
            .length || 0,
        past:
          myEvents.filter((event) => new Date(event.eventDate) < currentDate)
            .length || 0,
      })
    }
  }, [myEvents])

  if (isLoading) {
    return <Loading />
  }

  return (
    <div className=" mx-6 mt-10 mb-6">
      {isNewEvent && <NewEvent closeForm={() => setIsNewEvent(false)} />}
      <header className="items-center justify-between flex text-xl font-semibold">
        <h1>My Events</h1>
        <button
          onClick={() => setIsNewEvent(true)}
          className="text-lg border border-gray-700 p-1 rounded-md"
        >
          Create New Event
        </button>
      </header>{' '}
      {/* Admin Event Stats */}
      <div className="flex gap-4 mb-4 mt-8">
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
      {/* Events */}
      <section className="w-full flex flex-col mt-8 gap-8">
        {Array.isArray(myEvents) ? (
          myEvents.map((myEvent) => (
            <EventCard
              name={myEvent.eventName}
              created={myEvent.createdAt}
              date={myEvent.eventDate}
              registered={myEvent.registered.length || 0}
              key={myEvent.linkId}
              id={myEvent._id}
            />
          ))
        ) : (
          <p>Error loading events...</p>
        )}
      </section>
    </div>
  )
}

export default Events
