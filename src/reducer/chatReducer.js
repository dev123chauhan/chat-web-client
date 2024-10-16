import { createSlice } from '@reduxjs/toolkit';
import user2 from "../assets/user2.jpg"
import user3 from "../assets/user3.webp"
import user4 from "../assets/user4.jpg"
import user5 from "../assets/user5.jpg"
import user6 from "../assets/user6.jpg"
import group1 from "../assets/group.png"
import group2 from "../assets/group2.png"
import group3 from "../assets/group3.png"
const initialState = {
  drawerOpen: false,
  selectedChat: null,
  groups: [
    { name: 'Friends Forever', lastMessage: 'Hahahahah!', time: 'Today, 9:52pm', unread: 4, img: group1 },
    { name: 'My Gang', lastMessage: 'Kyuuuuu???', time: 'Yesterday, 12:31pm', img: group2 },
    { name: 'Hiking', lastMessage: "It's not going to happen", time: 'Wednesday, 9:12am', img: group3 },
  ],
  people: [
    { name: 'Alex', status: "April fool's day", time: 'Today, 9:52pm', online: true, img: user2 },
    { name: 'Flora', status: 'Baag', time: 'Today, 12:11pm', unread: 1, img: user3 },
    { name: "Shane", status: 'You have to report it...', time: 'Today, 2:40pm', unread: 1, img: user4 },
    { name: 'Suzie', status: 'Nevermind bro', time: 'Yesterday, 12:31pm', unread: 5, img: user5 },
    { name: 'Victoria H', status: "Okay, brother. let's see...", time: 'Wednesday, 11:12am', online: true, img: user6 },
  ],
  messages: [
    { text: 'Hey There!', time: 'Today, 8:30pm', sender: 'other' },
    { text: 'How are you?', time: 'Today, 8:30pm', sender: 'other' },
    { text: 'Hello!', time: 'Today, 8:33pm', sender: 'me' },
    { text: 'I am fine and how are you?', time: 'Today, 8:34pm', sender: 'me' },
    { text: 'I am doing well, Can we meet tomorrow?', time: 'Today, 8:36pm', sender: 'other' },
    { text: 'Yes Sure!', time: 'Today, 8:58pm', sender: 'me' },
  ],
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setDrawerOpen: (state, action) => {
      state.drawerOpen = action.payload;
    },
    setSelectedChat: (state, action) => {
      state.selectedChat = action.payload;
    },
    // Add more reducers as needed
  },
});

export const { setDrawerOpen, setSelectedChat } = chatSlice.actions;
export default chatSlice.reducer;