import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../app/features/Auth/authSlice";
import eventReducer from "../app/features/Events/eventSlice";
import registrarReducer from "../app/features/Registrars/registrarSlice";
import memberReducer from "../app/features/Members/memberSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    myEvents: eventReducer,
    registrars: registrarReducer,
    members: memberReducer,
  },
});
