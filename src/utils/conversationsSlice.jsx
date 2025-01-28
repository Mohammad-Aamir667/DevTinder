import { createSlice } from "@reduxjs/toolkit";


const conversationsSlice = createSlice({
  name: "conversations",
  initialState: {
    "user-user": [],  // For user-to-user conversations
    "expert-user": [],    
    userTpye:null,
    expertType:null,
     // For expert-to-user conversations
  },
  reducers: {
    setConversations: (state, action) => {
        console.log(action.payload);
      const conversationType = action.payload[0].conversationType;
      console.log(conversationType)
       if(conversationType === "expert-user"){
        state.expertType = conversationType;
       }
       else state.userTpye = "user-user"
      state[conversationType] = action.payload;
     
       // Add conversations based on their type
      console.log(state);
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
