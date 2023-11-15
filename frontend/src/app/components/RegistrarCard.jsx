import PropTypes from "prop-types";
import formatDate from "../lib/formatDate";
import { useNavigate } from "react-router-dom";

const RegistrarCard = ({ name, createdAt, status, id }) => {
  const navigate = useNavigate();
  return (
    <button
      className="w-full"
      onClick={() => {
        navigate(`/dashboard/registrars/${id}`);
      }}
    >
      <table className="flex w-full justify-between rounded-md border border-gray-700 px-4 py-2 lg:w-96 lg:p-4">
        <thead>
          <tr className="flex flex-col gap-2 text-left font-bold ">
            <th>Name</th>
            <th>Created</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr className="flex flex-col gap-2 text-right">
            <td>{name}</td>
            <td>{formatDate(createdAt)}</td>
            <td>
              {status ? (
                <span className="rounded bg-green-400 px-1 py-0.5 font-bold">
                  Active
                </span>
              ) : (
                <span className="rounded bg-red-600 px-1 py-0.5 font-bold">
                  Inactive
                </span>
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </button>
  );
};

RegistrarCard.propTypes = {
  name: PropTypes.string,
  createdAt: PropTypes.string,
  status: PropTypes.bool,
  id: PropTypes.string,
};

RegistrarCard.defaultProps = {
  name: "registrar",
  createdAt: "0/0/0",
  status: "0/0/0",
};

export default RegistrarCard;
