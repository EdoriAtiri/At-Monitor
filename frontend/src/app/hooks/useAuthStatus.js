import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/Auth/authSlice";
import isTokenValid from "../lib/validateToken";

export const useAuthStatus = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(true);

  const { admin } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (admin) {
      if (isTokenValid(admin.token)) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
        dispatch(reset());
        dispatch(logout());
      }
    } else {
      setLoggedIn(false);
    }

    setCheckingStatus(false);
  }, [admin, dispatch]);

  return { loggedIn, checkingStatus };
};
