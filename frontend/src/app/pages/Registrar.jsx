import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import ActConfirmation from '../components/ActConfirmation'
import {
  getRegistrar,
  toggleRegistrarActivation,
  deleteRegistrar,
} from '../features/Registrars/registrarSlice'

function Registrar() {
  const [isDeletePrompt, setIsDeletePrompt] = useState(false)
  const { registrar, isLoading, isError, message, isSuccess } = useSelector(
    (state) => state.registrars
  )

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { registrarId } = useParams()

  useEffect(() => {
    dispatch(getRegistrar(registrarId))

    if (isError) {
      toast.error(message)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError, message, registrarId])

  // Toggle Registrar Activation
  const onClickActivation = () => {
    const data = { isActivated: !registrar.isActivated }
    dispatch(
      toggleRegistrarActivation({
        data,
        registrarId,
      })
    )
  }

  // Show Delete Confirmation

  // Delete Registrar
  const onDeleteRegistrar = () => {
    dispatch(deleteRegistrar(registrarId))
    setIsDeletePrompt(false)
    if (isSuccess) {
      navigate('/dashboard/registrars')
    }
  }

  if (isLoading) {
    return <div>Loading...</div>
  }
  return (
    <div className=" mx-6 mt-10 mb-6">
      {/* {edit && (
        <EditEventForm
          eventId={eventId}
          closeEdit={() => setEditEvent(false)}
        />
      )} */}
      {isDeletePrompt && (
        <ActConfirmation
          action={`delete ${registrar.fullName} ?`}
          title="delete"
          onClickBtn={onDeleteRegistrar}
          onClickCancel={() => setIsDeletePrompt(false)}
        />
      )}
      {/* Stat for creator and date */}
      <div className="flex gap-4 mb-4 justify-between">
        <h1 className="text-3xl mb-5 uppercase">{registrar.fullName}</h1>
        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onClickActivation}
            className="text-lg border border-gray-700 p-1 rounded-md"
          >
            {registrar.isActivated ? 'deactivate' : 'activate'}
          </button>
          <button
            onClick={() => setIsDeletePrompt(true)}
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
                <p className="text-red-500">Inactive</p>
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
