// import { useEffect, useState } from 'react'
// import formatDate from '../lib/formatDate'
// import { useSelector, useDispatch } from 'react-redux'
// import { useNavigate, useParams } from 'react-router-dom'
// import { toast } from 'react-toastify'

function Registrar() {
  //   const [edit, setEdit] = useState(false)
  //   const { registrar, isLoading, isError, message, isSuccess } = useSelector(
  // (state) => state.myEvents )
  //   const { admin } = useSelector((state) => state.auth)

  //   const dispatch = useDispatch()
  //   const navigate = useNavigate()
  //   const { registrarId } = useParams()

  //   useEffect(() => {
  //     if (isError) {
  //       toast.error(message)
  //     }

  //     dispatch(getEvent(registrarId))

  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, [isError, message, registrarId])

  //   if (isLoading) {
  //     return <div>Loading...</div>
  //   }

  //   const openEdit = () => {
  //     setEdit(true)
  //   }

  // Delete Event
  //   const onDeleteEvent = () => {
  //     dispatch(deleteEvent(eventId))

  //     if (isSuccess) {
  //       navigate('/dashboard/events')
  //     }
  //   }

  return (
    <div className=" mx-6 mt-10 mb-6">
      {/* {edit && (
        <EditEventForm
          eventId={eventId}
          closeEdit={() => setEditEvent(false)}
        />
      )} */}
      <h1 className="text-3xl mb-5 uppercase">{}</h1>
      {/* Stat for creator and date */}
      <div className="flex gap-4 mb-4">
        <div className="stats shadow">
          <div className="stat">
            <div className="stat-title">Status</div>
            <div className="stat-value text-2xl">{}</div>
          </div>

          {/* <div className="stat">
            <div className="stat-title">Event Date</div>
            <div className="stat-value text-2xl">
              {formatDate(myEvent.eventDate)}
            </div>
          </div> */}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            // onClick={openEdit}
            className="text-lg border border-gray-700 p-1 rounded-md"
          >
            Edit
          </button>
          <button
            // onClick={onDeleteRegistrar}
            className="text-lg border border-gray-700 p-1 rounded-md"
          >
            Delete
          </button>
        </div>
      </div>
      {/* Table for description and link
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
      </table>{' '} */}
    </div>
  )
}

export default Registrar
