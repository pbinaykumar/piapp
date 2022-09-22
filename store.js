import { configureStore } from "@reduxjs/toolkit";
import conversationReducer from "./components/ConversationWidget/reducer";

export const store = configureStore({
  reducer: {
    conversations: conversationReducer,
  },
});
