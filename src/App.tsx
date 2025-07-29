import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DarkModeProvider } from './contexts/DarkModeContext';
import { GoalProvider } from './contexts/GoalContext';
import { UserProvider } from './contexts/UserContext';
import { ToastProvider, useToast } from './contexts/ToastContext';
import ToastNotification from './components/ui/ToastNotification';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Terms from './pages/Terms';
import MainHome from './pages/Main/MainHome';
import GoalList from './pages/Main/Goals/GoalList';
import BookmarkList from './pages/Main/Goals/BookmarkList';
import FriendList from './pages/Main/Friends/FriendList';
import Settings from './pages/Main/Settings/settings';

function AppContent() {
  const { isVisible, hideToast, currentMessage, currentType } = useToast();

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
      <ToastNotification
        isVisible={isVisible}
        onClose={hideToast}
        message={currentMessage}
        type={currentType}
      />
    </BrowserRouter>
  );
}

function App() {
  return (
    <UserProvider>
      <DarkModeProvider>
        <GoalProvider>
          <ToastProvider>
            <AppContent />
          </ToastProvider>
        </GoalProvider>
      </DarkModeProvider>
    </UserProvider>
  );
}

export default App;
