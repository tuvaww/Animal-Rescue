import { configureStore } from "@reduxjs/toolkit";
import sessionReducer from "./features/SessionSlice";

export default configureStore({
  reducer: {
    session: sessionReducer,
  },
});
