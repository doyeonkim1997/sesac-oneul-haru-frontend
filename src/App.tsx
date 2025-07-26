import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Terms from './pages/Terms';
import MainHome from './pages/Main/MainHome';
import GoalList from './pages/Main/Goals/GoalList';
import BookmarkList from './pages/Main/Goals/BookmarkList';
import FriendList from './pages/Main/Friends/FriendList';
import Settings from './pages/Main/componets/settings/settings';
// ... 다른 import

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/main" element={<MainHome />} />
        <Route path="/goals" element={<GoalList />} />
        <Route path="/bookmarks" element={<BookmarkList />} />
        <Route path="/friends" element={<FriendList />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
