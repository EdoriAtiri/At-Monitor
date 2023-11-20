import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  getMember,
  deleteMember,
  reset,
} from "../features/Members/memberSlice";
import Loading from "../components/Loading";
import ActConfirmation from "../components/ActConfirmation";

const Member = () => {
  const [isDeletePrompt, setIsDeletePrompt] = useState(false);
  const { member, isLoading, isError, message } = useSelector(
    (state) => state.members,
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { memberId } = useParams();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    dispatch(getMember(memberId));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError, message, memberId]);

  const onDeleteMember = () => {
    dispatch(deleteMember(memberId)), navigate(`/dashboard/members/`);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="mx-6 mb-6 mt-10">
      {isDeletePrompt && (
        <ActConfirmation
          action={`delete ${member?.fullName?.split(" ")[0]}`}
          title="delete"
          onClickBtn={onDeleteMember}
          onClickCancel={() => setIsDeletePrompt(false)}
        />
      )}
      <header className="mb-5 flex justify-between">
        <h1 className=" text-3xl uppercase">
          {member?.fullName?.split(" ")[0]}
        </h1>
        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={() => {
              dispatch(reset()),
                navigate(`/dashboard/members/create?type=edit&id=${memberId}`);
            }}
            className="rounded-md border border-gray-700 p-1 text-lg"
          >
            Edit
          </button>
          <button
            onClick={() => setIsDeletePrompt(true)}
            className="rounded-md border border-gray-700 p-1 text-lg"
          >
            Delete
          </button>
        </div>
      </header>

      <table className="flex w-full justify-evenly rounded-md px-4 py-2 lg:w-96 lg:p-4">
        <thead>
          <tr className="flex flex-col gap-2 text-left font-bold ">
            <th>Full Name:</th>
            <th>Gender:</th>
            <th>Category:</th>
            <th>Email:</th>
            <th>Phone:</th>
            <th>Address:</th>
            <th>Membership Status:</th>
          </tr>
        </thead>
        <tbody>
          <tr className="flex flex-col gap-2 ">
            <td>{member.fullName}</td>
            <td>{member.gender}</td>
            <td>{member.category}</td>
            <td>{member.email}</td>
            <td>{member.phone}</td>
            <td>{member.address}</td>
            <td>{member.membershipStatus}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Member;
