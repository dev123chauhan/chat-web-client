import { configureStore } from '@reduxjs/toolkit';
import chatReducer from '../reducer/chatReducer';
const store = configureStore({
  reducer: {
    chat: chatReducer,
  },
});

export default store;