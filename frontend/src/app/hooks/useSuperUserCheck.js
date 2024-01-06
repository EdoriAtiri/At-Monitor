import { useSelector } from "react-redux";

const useSuperUserCheck = () => {
  // Use useSelector to get the user data from Redux store
  const admin = useSelector((state) => state.auth.admin);

  // Check if the user is a super user
  const isSuperUser =
    admin &&
    (admin.type === "admin" ||
      (admin.type === "registrar" && admin.hasAdminPrivilege));

  return isSuperUser;
};

export default useSuperUserCheck;
