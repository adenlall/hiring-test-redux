import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sessiontype: 'writer',
};

const sessiontypeSlice = createSlice({
  name: "sessiontype",
  initialState,
  reducers: {
    toggleType: (state, actions) => {
      return {
        ...state,
        // safe insert in case given value differs from this two
        sessiontype: actions.payload === 'publisher' ? 'publisher' : 'writer',
      };
    },
  },
});

export const { toggleType } = sessiontypeSlice.actions;

export default sessiontypeSlice.reducer;
