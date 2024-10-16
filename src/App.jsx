import { Provider } from 'react-redux';
import store from './store/store';
import ChatUI from './components/ChatUI';
export default function App() {
  return (
    <Provider store={store}>
      <ChatUI />
    </Provider>
  )
}
