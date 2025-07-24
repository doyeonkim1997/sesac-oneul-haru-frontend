import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import MainHome from './pages/Main/MainHome';
import GoalList from './pages/Main/Goals/GoalList';
import FriendList from './pages/Main/Friends/FriendList';
// ... 다른 import

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/main" element={<MainHome />} />
        <Route path="/goals" element={<GoalList />} />
        <Route path="/friends" element={<FriendList />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
