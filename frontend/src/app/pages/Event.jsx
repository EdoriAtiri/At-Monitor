import { useEffect, useState } from 'react'
import formatDate from '../lib/formatDate'
import { useSelector, useDispatch } from 'react-redux'
import { getEvent } from '../features/Events/eventSlice'
import { useParams } from 'react-router-dom'
import EditEventForm from '../components/EditEventForm'

function Event() {
  const [editEvent, setEditEvent] = useState(false)
  const { myEvent, isLoading, isError, message } = useSelector(
    (state) => state.myEvents
  )
  const { admin } = useSelector((state) => state.auth)

  const dispatch = useDispatch()
  const { eventId } = useParams()

  useEffect(() => {
    if (isError) {
      console.log(message)
    }

    dispatch(getEvent(eventId))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError, message, eventId])

  if (isLoading) {
    return <div>Loading...</div>
  }

  const openEdit = () => {
    setEditEvent(true)
  }

  return (
    <div className=" mx-6 mt-10 mb-6">
      {editEvent && (
        <EditEventForm
          eventId={eventId}
          closeEdit={() => setEditEvent(false)}
        />
      )}
      <h1 className="text-3xl mb-5 uppercase">{myEvent.eventName}</h1>
      {/* Table for creator and date */}
      <div className="flex gap-2 mb-4">
        <div className="stats">
          <div className="stat">
            <div className="stat-title">Created By</div>
            <div className="stat-value text-2xl">
              {`${admin.firstName} ${admin.lastName}`}
            </div>
          </div>

          <div className="stat">
            <div className="stat-title">Event Date</div>
            <div className="stat-value text-2xl">
              {formatDate(myEvent.eventDate)}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={openEdit}
            className="text-lg border border-gray-700 p-1 rounded-md"
          >
            Edit
          </button>
          <button className="text-lg border border-gray-700 p-1 rounded-md">
            Delete
          </button>
        </div>
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
      </table>{' '}
      {/* Registered attendees */}
      {/* <section className="mt-8">
        <div>
          <h2 className="text-xl">Registered Participants</h2>
          {myEvent.registered.length === 0 && <div>no registered yet</div>}
          {myEvent.registered.length && (
            <div>
              <span>
                <span>10</span>total
              </span>
              <div className="flex">
                sort by:{' '}
                <select>
                  <option value="date">Date</option>
                  <option value="name">Name</option>
                </select>
              </div>
              <ul></ul>
            </div>
          )}
        </div>
      </section> */}
    </div>
  )
}

export default Event
