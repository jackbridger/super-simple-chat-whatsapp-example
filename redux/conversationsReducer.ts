import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { Conversation, Message,ConversationPreviewType } from "../types";
import sortConversations from "../helpers/sortConversations";
import storage from "@react-native-async-storage/async-storage";
import { PURGE } from "redux-persist";

export interface ConversationState {
  conversations: ConversationPreviewType[];
  currentConversation: ConversationPreviewType | null;
  currentConversationMessages: Message[];
}

const initialState: ConversationState = {
  conversations: [],
  currentConversation: null,
  currentConversationMessages:[]
};

export const conversationsSlice = createSlice({
  name: "conversations",
  initialState,
  reducers: {
    addAllConversations: (
      state: ConversationState,
      action: PayloadAction<ConversationPreviewType[]>
    ): void => {
      state.conversations = sortConversations(action.payload);
    },
    setCurrentConversation: (
      state: ConversationState,
      action: PayloadAction<ConversationPreviewType>
    ): void => {
      if (action.payload) {
        state.currentConversation = action.payload;
      }
    },
    addNewConversation: (
      state: ConversationState,
      action: PayloadAction<ConversationPreviewType>
    ): void => {
      if (action.payload) {
        const conversationAlreadyExists = state.conversations.find(
          (conv) => conv.id === action.payload.id
        );
        if (!conversationAlreadyExists) {
          state.conversations = sortConversations([
            ...state.conversations,
            action.payload,
          ]);
        }
      }
    },
    markConversationAsRead: (
      state: ConversationState,
      action: PayloadAction<ConversationPreviewType>
    ): void => {
      console.log('to do')
    },
    sendMessage: (
      state: ConversationState,
      action: PayloadAction<Message>
    ): void => {
      const message = action.payload;
      state.currentConversationMessages.push(message);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, (state) => {
      storage.removeItem("persist:root");
    });
  },
});

// Action creators are generated for each case reducer function
export const {
  addAllConversations,
  sendMessage,
  setCurrentConversation,
  addNewConversation,
  markConversationAsRead,
} = conversationsSlice.actions;

export default conversationsSlice.reducer;
