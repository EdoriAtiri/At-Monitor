import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ActConfirmation from "../components/ActConfirmation";
import Loading from "../components/Loading";
import { FaCopy } from "react-icons/fa6";
import {
  getRegistrar,
  toggleRegistrarActivation,
  deleteRegistrar,
  generateActivationToken,
  resetRegistrarState,
} from "../features/Registrars/registrarSlice";

function Registrar() {
  const [isDeletePrompt, setIsDeletePrompt] = useState(false);
  const { registrar, isLoading, isError, message, isSuccess } = useSelector(
    (state) => state.registrars,
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { registrarId } = useParams();
  const domain = window.location.hostname;

  useEffect(() => {
    dispatch(getRegistrar(registrarId));

    if (isSuccess) {
      dispatch(resetRegistrarState());
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [registrarId]);

  // Toggle Registrar Activation
  const onClickActivation = () => {
    const data = { isActivated: !registrar.isActivated };
    dispatch(
      toggleRegistrarActivation({
        data,
        registrarId,
      }),
    );
  };

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
  }, [isError, message]);

  // Delete Registrar
  const onDeleteRegistrar = () => {
    dispatch(deleteRegistrar(registrarId));
    setIsDeletePrompt(false);
    if (isSuccess) {
      navigate("/dashboard/registrars");
    }
  };

  // Generate Registrar activation Link
  const generateLink = () => {
    dispatch(generateActivationToken(registrarId));
  };

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className=" mx-6 mb-6 mt-10">
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
      <div className="mb-4 flex justify-between gap-4">
        <h1 className="mb-5 text-3xl uppercase">{registrar.fullName}</h1>
        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onClickActivation}
            className="rounded-md border border-gray-700 p-1 text-lg"
          >
            {registrar.isActivated ? "deactivate" : "activate"}
          </button>
          <button
            onClick={() => setIsDeletePrompt(true)}
            className="rounded-md border border-gray-700 p-1 text-lg"
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
            <td>{registrar.isAdmin ? "Yes" : "No"}</td>
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
      </table>{" "}
      {/* Generated registrar token */}
      <div className="card mt-4 w-96 bg-base-100 p-4 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Activation Link</h2>
          {registrar.token ? (
            <Link
              to={"/registrar/" + registrar.token + "/activation"}
              className=""
            >
              {domain + ":5173/" + registrar.token.slice(0, 34) + "..."}
            </Link>
          ) : (
            <p>Click Generate to create a new activation link</p>
          )}
        </div>
        <div className="card-actions flex items-center justify-end gap-2">
          {registrar.token && (
            <button
              onClick={() => {
                navigator.clipboard.writeText(
                  domain +
                    ":5173/" +
                    "registrar/" +
                    registrar.token +
                    "/activation",
                );
              }}
              className="transition-all hover:text-blue-500 focus:text-blue-500 active:scale-90"
            >
              <FaCopy />
            </button>
          )}
          <button onClick={generateLink} className="btn">
            Generate
          </button>
        </div>
      </div>
    </div>
  );
}

export default Registrar;
