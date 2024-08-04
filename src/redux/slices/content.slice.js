import { hashString } from "@/crypto";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  content: {
    data:JSON.stringify([])
  },
};

const contentSlice = createSlice({
  name: "content",
  initialState,
  reducers: {
    setContent: (state, actions) => {
      const tempArr = JSON.parse(state.content.data);
      tempArr.push({
        title: actions.payload.title,
        body: actions.payload.body,
        image: actions.payload.image,
        sensitive: hashString(actions.payload.sensitive),
      });
      return {
        ...state,
        content: {
          data:JSON.stringify(tempArr)
        }
      };
    },
    deleteContentByIndex: (state, actions) => {
      const tempArr = JSON.parse(state.content.data);
      tempArr.splice(actions.payload, 1);
      return {
        ...state,
        content: {
          data:JSON.stringify(tempArr)
        }
      };
    },
    resetContent: (state) => {
      return {
        ...state,
        content: {
          data:JSON.stringify([])
        }
      };
    },
  },
});

export const { setContent, deleteContentByIndex, resetContent } = contentSlice.actions;

export default contentSlice.reducer;
