import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, Link } from 'react-router-dom'
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
      {/* Stat for creator and date */}
      <div className="flex gap-4 mb-4 justify-between">
        <h1 className="text-3xl mb-5 uppercase">{registrar.fullName}</h1>
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
      {/* Registrar Details */}
      <table className="table">
        <thead>
          <tr className="font-bold">
            <th>Full Name</th>
            <th>Admin Status</th>
            <th>Status</th>
            <th>Email</th>
            <th>Membership</th>
          </tr>
        </thead>
        <tbody>
          <tr className="">
            <td>{registrar.fullName}</td>
            <td>{registrar.isAdmin ? 'Yes' : 'No'}</td>
            <td>
              {registrar.isActivated ? (
                <p className="text-green-500">Active</p>
              ) : (
                <p className="text-red-500">Disabled</p>
              )}
            </td>
            <td>{registrar.email}</td>
            {/* @todo 
            Add Icon instead of text and add link address */}
            <td>
              <Link>Link</Link>
            </td>
          </tr>
        </tbody>
      </table>{' '}
    </div>
  )
}

export default Registrar
