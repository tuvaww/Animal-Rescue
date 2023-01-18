import { createSlice } from "@reduxjs/toolkit";
import { getToken, logout, setToken } from "../../services/StorageServices";
import { IAction } from "../models/IAction";

let defaultValue: string = getToken();

const sessionSlice = createSlice({
  name: "session",
  initialState: { value: defaultValue },
  reducers: {
    add: (state, action: IAction<string>) => {
      state.value = action.payload;
      setToken(state.value);
    },
    remove: (state) => {
      state.value = "";
      logout();
    },
  },
});

export const { add, remove } = sessionSlice.actions;

export default sessionSlice.reducer;
