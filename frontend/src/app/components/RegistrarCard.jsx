import PropTypes from 'prop-types'
import formatDate from '../lib/formatDate'
import { useNavigate } from 'react-router-dom'

const RegistrarCard = ({ name, createdAt, status, id }) => {
  const navigate = useNavigate()
  return (
    <button
      className="w-full"
      onClick={() => {
        navigate(`/dashboard/registrars/${id}`)
      }}
    >
      <table className="flex w-full lg:w-96 justify-between border border-gray-700 py-2 px-4 lg:p-4 rounded-md">
        <tr className="font-bold flex gap-2 flex-col text-left ">
          <th>Name</th>
          <th>Created</th>
          <th>Status</th>
        </tr>
        <tr className="flex gap-2 flex-col text-right">
          <td>{name}</td>
          <td>{formatDate(createdAt)}</td>
          <td>
            {status ? (
              <span className="bg-green-400 font-bold rounded px-1 py-0.5">
                Active
              </span>
            ) : (
              <span className="bg-red-600 font-bold rounded px-1 py-0.5">
                Inactive
              </span>
            )}
          </td>
        </tr>
      </table>
    </button>
  )
}

RegistrarCard.propTypes = {
  name: PropTypes.string,
  createdAt: PropTypes.string,
  status: PropTypes.string,
  id: PropTypes.string,
}

RegistrarCard.defaultProps = {
  name: 'registrar',
  createdAt: '0/0/0',
  status: '0/0/0',
}

export default RegistrarCard
