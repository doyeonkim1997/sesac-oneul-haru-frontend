import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { DarkModeProvider } from './contexts/DarkModeContext';
import { GoalProvider } from './contexts/GoalContext';
import { ApiGoalProvider } from './contexts/ApiGoalContext';
import { UserProvider } from './contexts/UserContext';
import ToastNotification from './components/ui/ToastNotification';
import { useAuth, AuthProvider } from './contexts/AuthContext';

import Signup from './pages/Signup';
import Login from './pages/Login';
import Terms from './pages/Terms';
import MainHome from './pages/Main/MainHome';
import GoalList from './pages/Main/Goals/GoalList';
import BookmarkList from './pages/Main/Goals/BookmarkList';
import FriendList from './pages/Main/Friends/FriendList';
import Settings from './pages/Main/Settings/Settings';

import PrivateRoute from './components/common/PrivateRoute';
import RootRedirector from './components/common/RootRedirector';

function AppContent() {
  const { accessToken } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootRedirector />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/main"      element={<PrivateRoute><MainHome /></PrivateRoute>} />
        <Route path="/goals"     element={<PrivateRoute><GoalList /></PrivateRoute>} />
        <Route path="/bookmarks" element={<PrivateRoute><BookmarkList /></PrivateRoute>} />
        <Route path="/friends"   element={<PrivateRoute><FriendList /></PrivateRoute>} />
        <Route path="/settings"  element={<PrivateRoute><Settings /></PrivateRoute>} />
        <Route path="/terms"     element={<PrivateRoute><Terms /></PrivateRoute>} />
      </Routes>
      {accessToken && <ToastNotification />}
    </BrowserRouter>
  );
}

function App() {
  return (
    <DarkModeProvider>
      <AuthProvider>
        <UserProvider>
          <GoalProvider>
            <ApiGoalProvider>
              <AppContent />
            </ApiGoalProvider>
          </GoalProvider>
        </UserProvider>
      </AuthProvider>
    </DarkModeProvider>
  );
}

export default App;