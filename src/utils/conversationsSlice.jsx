import { createSlice } from "@reduxjs/toolkit";


const conversationsSlice = createSlice({
  name: "conversations",
  initialState: {
    "user-user": [],  // For user-to-user conversations
    "expert-user": [],    
  },
  reducers: {
    setConversations: (state, action) => {
      const conversationType = action.payload[0].conversationType;
      state[conversationType] = action.payload;
    },
    updateConversations: (state, action) => {
      const { id, lastMessage, timestamp, type } = action.payload;
      const index = state[type].findIndex((convo) => convo._id === id);

      if (index !== -1) {
        state[type][index].lastMessage = lastMessage;
        state[type][index].timestamp = timestamp;
      }
    },
  },
});

export const { setConversations, updateConversations } = conversationsSlice.actions;
export default conversationsSlice.reducer;
