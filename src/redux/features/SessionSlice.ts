import { createSlice } from "@reduxjs/toolkit";
import { getToken, setToken } from "../../services/StorageServices";
import { IAction } from "../models/IAction";

let defaultValue: string = getToken();

const sessionSlice = createSlice({
  name: "session",
  initialState: { value: defaultValue },
  reducers: {
    get: (state) => {
      console.log("state i storen", state.value);
    },
    add: (state, action: IAction<string>) => {
      state.value = action.payload;
      setToken(state.value);
    },
    /*  remove: (state, action: IAction<number>) => {
        state.value.splice(action.payload, 1);
        save(state.value);
      }, */
    /*  
    remove: (state, action: IAction<number>) => {
      state.value.splice(action.payload, 1);
      save(state.value);
    },
    toggle: (state, action: IAction<number>) => {
      state.value[action.payload].done = !state.value[action.payload].done;
      save(state.value);
    }, */
  },
});

export const { /*add, remove, toggle */ get, add } = sessionSlice.actions;

export default sessionSlice.reducer;
