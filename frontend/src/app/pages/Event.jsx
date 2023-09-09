import { useEffect } from 'react'
import formatDate from '../lib/formatDate'
import { useSelector, useDispatch } from 'react-redux'
import { getEvent } from '../features/Events/eventSlice'
import { useParams } from 'react-router-dom'

function Event() {
  const { myEvent, isLoading, isError, message } = useSelector(
    (state) => state.myEvents
  )

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

  return (
    <div className=" mx-6 mt-10 mb-6">
      <h1 className="text-3xl mb-5 uppercase">{myEvent.eventName}</h1>
      {/* Table for creator and date */}
      <div className="flex ">
        <table className="flex flex-col mb-6 w-full lg:w-96 justify-between relative">
          <thead>
            <tr className="font-bold flex [&>*]:w-28 [&>*]:text-left">
              <th>Created By</th>
              <th>Event Date</th>
            </tr>
          </thead>

          {/* <div className="w-[1px] h-full bg-slate-700 absolute left-24"></div> */}
          <tbody>
            <tr className="flex [&>*]:w-28">
              <td>{myEvent.admin}</td>
              <td>{formatDate(myEvent.eventDate)}</td>
            </tr>
          </tbody>
        </table>{' '}
        {/* Actions */}
        <div className="flex items-start gap-3">
          <button className="text-lg border border-gray-700 p-1 rounded-md">
            Edit
          </button>
          <button className="text-lg border border-gray-700 p-1 rounded-md">
            Delete
          </button>
        </div>
      </div>
      {/* Table for description and link */}
      <table className="flex w-full lg:w-96 justify-between ">
        <thead>
          <tr className="font-bold flex gap-2 flex-col [&>*]:h-12 [&>*]:min-h-fit [&>*]:w-24 [&>*]:text-left">
            <th>Description</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>
          <tr className="flex gap-2 flex-col">
            <td>{myEvent.description}</td>
            <td>{myEvent.linkId}</td>
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
