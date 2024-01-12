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
  toggleHasAdminPrivilege,
} from "../features/Registrars/registrarSlice";
import useSuperUserCheck from "../hooks/useSuperUserCheck";

function Registrar() {
  const [isDeletePrompt, setIsDeletePrompt] = useState(false);
  const isSuperUser = useSuperUserCheck();
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

  // Toggle Registrar Privilege
  const onClickAdminPrivilege = () => {
    const data = { hasAdminPrivilege: !registrar.hasAdminPrivilege };
    dispatch(
      toggleHasAdminPrivilege({
        data,
        registrarId,
      }),
    );
  };

  useEffect(() => {
    if (isError) {
      toast.error(message);
      dispatch(resetRegistrarState());
    }
  }, [dispatch, isError, message]);

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
  return isSuperUser ? (
    <div className=" mx-6 mb-6 mt-10">
      {isDeletePrompt && (
        <ActConfirmation
          action={`delete ${registrar.fullName} ?`}
          title="delete"
          onClickBtn={onDeleteRegistrar}
          onClickCancel={() => setIsDeletePrompt(false)}
        />
      )}
      {/* Stat for creator and date */}
      <div className="mb-4 flex flex-col justify-between gap-4 sm:flex-row">
        <h1 className="mb-5 text-3xl uppercase">{registrar.fullName}</h1>
        {/* Actions */}
        <div className="flex items-center gap-3">
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text mr-1 text-lg sm:mr-2">
                Admin Privilege
              </span>
              <input
                onChange={onClickAdminPrivilege}
                type="checkbox"
                className="toggle"
                checked={registrar.hasAdminPrivilege}
              />
            </label>
          </div>
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
      <div className="mt-6 overflow-x-auto rounded-lg border shadow-sm">
        <table className="table table-auto">
          <thead>
            <tr className="font-bold">
              <th>Full Name</th>
              <th>Admin Status</th>
              <th>Status</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody className="divide-y">
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
            </tr>
          </tbody>
        </table>{" "}
      </div>
      {/* Generated registrar token */}
      <div className="w-70 card mt-4 bg-base-100 p-4 shadow-xl sm:w-96">
        <div className="card-body">
          <h2 className="card-title">Activation Link</h2>
          {registrar.token ? (
            <Link
              to={"/registrar/" + registrar.token + "/activation"}
              className="w-full break-all"
            >
              <p className="line-clamp-2 font-bold">
                {domain + ":5173/" + registrar.token}
              </p>
            </Link>
          ) : (
            <p>Click Generate to create a new activation link</p>
          )}
        </div>
        <div className="card-actions flex items-center justify-end gap-2">
          {/* Copy to clipboard */}
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
  ) : (
    <div className="ml-6 mt-10">
      <h1 className="text-xl font-bold">
        Not Allowed. Contact your administrator
      </h1>
    </div>
  );
}

export default Registrar;
