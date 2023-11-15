import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getMember } from "../features/Members/memberSlice";

const Member = () => {
  const { member, isLoading, isError, message, isSuccess } = useSelector(
    (state) => state.members,
  );
  const dispatch = useDispatch();

  const { memberId } = useParams();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    dispatch(getMember(memberId));
    console.log(member, isLoading, isSuccess);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError, message, memberId]);

  return (
    <div className="mx-6 mt-10 mb-6">
      <h1 className="text-3xl mb-5 uppercase">
        {member?.fullName?.split(" ")[0]}
      </h1>

      <table className="flex w-full lg:w-96 justify-evenly py-2 px-4 lg:p-4 rounded-md">
        <thead>
          <tr className="font-bold flex gap-2 flex-col text-left ">
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
          <tr className="flex gap-2 flex-col ">
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
