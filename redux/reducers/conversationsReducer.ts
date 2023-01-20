import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import startingConversations from "../../data/startingConversations";
import { ConversationType, MessageType } from "../../types";
import sortConversations from "../../helpers/sortConversations";

export interface ConversationState {
  conversations: ConversationType[];
  currentConversation: ConversationType | null;
}

const initialState: ConversationState = {
  conversations: sortConversations(startingConversations),
  currentConversation: null,
};

export const conversationsSlice = createSlice({
  name: "conversations",
  initialState,
  reducers: {
    addAllConversations: (
      state: ConversationState,
      action: PayloadAction<ConversationType[]>
    ): void => {
      state.conversations = sortConversations(action.payload);
    },
    setCurrentConversation: (
      state: ConversationState,
      action: PayloadAction<ConversationType>
    ): void => {
      if (action.payload) {
        state.currentConversation = action.payload;
      }
    },

    sendMessage: (
      state: ConversationState,
      action: PayloadAction<MessageType>
    ): void => {
      const message = action.payload;
      const conversationToUpdate = state.conversations.find(
        (conversation) => conversation.id === message.conversationID
      );
      if (conversationToUpdate) {
        conversationToUpdate.messages.push(message);
      }
      if (
        state.currentConversation &&
        message.conversationID === state.currentConversation.id
      ) {
        state.currentConversation.messages.push(message);
      }
      state.conversations = sortConversations(state.conversations);
    },
  },
});

// Action creators are generated for each case reducer function
export const { addAllConversations, sendMessage, setCurrentConversation } =
  conversationsSlice.actions;

export default conversationsSlice.reducer;

// import { ConversationType, MessageType } from "../../types";

// type ConversationsReduxState = {
//   conversations: ConversationType[];
// };

// type Action = {
//   type: ConversationActionTypes;
//   message: MessageType;
// };
// enum ConversationActionTypes {
//   SEND_MESSAGE = "SEND_MESSAGE",
// }

// const initialState: ConversationsReduxState = {
//   conversations: [],
// };

// export default (state = initialState, action: Action) => {
//   switch (action.type) {
//     case "SEND_MESSAGE":
//       state.conversations.map((conversation) => {
//         if (conversation.id === action.message.conversationID) {
//           conversation.messages.push(action.message);
//         }
//       });
//       return {
//         ...state,
//       };
//     // case "COUNT_DECRESE":
//     //   return {
//     //     ...state,
//     //     count: state.count - 1,
//     //   };
//     default:
//       return state;
//   }
// };
