import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getRegistrar } from '../features/Registrars/registrarSlice'

function Registrar() {
  // const [edit, setEdit] = useState(false)
  const { registrar, isLoading, isError, message } = useSelector(
    (state) => state.registrars
  )

  const dispatch = useDispatch()
  // const navigate = useNavigate()
  const { registrarId } = useParams()

  useEffect(() => {
    dispatch(getRegistrar(registrarId))

    if (isError) {
      toast.error(message)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError, message, registrarId])

  if (isLoading) {
    return <div>Loading...</div>
  }

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
      <h1 className="text-3xl mb-5 uppercase">{registrar.fullName}</h1>
      {/* Stat for creator and date */}
      <div className="flex gap-4 mb-4">
        <div className="stats shadow">
          <div className="stat">
            <div className="stat-title">Status</div>
            <div className="stat-value text-2xl">{registrar.isActivated}</div>
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
