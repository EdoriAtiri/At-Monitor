import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'

function MemberCard({ name, category, gender, membershipStatus, id }) {
  const navigate = useNavigate()

  return (
    <button
      className="w-full"
      onClick={() => {
        navigate(`/dashboard/members/${id}`)
      }}
    >
      <table className="flex w-full lg:w-96 justify-between border border-gray-700 py-2 px-4 lg:p-4 rounded-md">
        <thead>
          <tr className="font-bold flex gap-2 flex-col text-left ">
            <th>Full Name:</th>
            <th>Gender:</th>
            <th>Category:</th>
            <th>Membership Status:</th>
          </tr>
        </thead>
        <tbody>
          <tr className="flex gap-2 flex-col text-right">
            <td>{name}</td>
            <td>{gender}</td>
            <td>{category}</td>
            <td>{membershipStatus}</td>
          </tr>
        </tbody>
      </table>
    </button>
  )
}

MemberCard.propTypes = {
  name: PropTypes.string,
  gender: PropTypes.string,
  category: PropTypes.string,
  membershipStatus: PropTypes.number,
  id: PropTypes.string,
}

MemberCard.defaultProps = {
  name: 'john doe',
  gender: '-',
  category: 'adult',
  membershipStatus: 0,
}

export default MemberCard
