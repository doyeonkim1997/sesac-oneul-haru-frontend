import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { DarkModeProvider } from './contexts/DarkModeContext';
import { GoalProvider } from './contexts/GoalContext';
import { UserProvider } from './contexts/UserContext';
import { ToastProvider, useToast } from './contexts/ToastContext';
import ToastNotification from './components/ui/ToastNotification';
import { useAuth } from './contexts/AuthContext';

import Signup from './pages/Signup';
import Login from './pages/Login';
import Terms from './pages/Terms';
import MainHome from './pages/Main/MainHome';
import GoalList from './pages/Main/Goals/GoalList';
import BookmarkList from './pages/Main/Goals/BookmarkList';
import FriendList from './pages/Main/Friends/FriendList';
import Settings from './pages/Main/Settings/Settings';
import PrivateRoute from './components/common/PrivateRoute';
import AuthLoader from './components/common/AuthLoader';

function AppContent() {
  const { isVisible, hideToast, currentMessage, currentType } = useToast();
  const { accessToken } = useAuth();

  // 로그인 필요한 경로들
  const privateRoutes = [
    { path: '/main', element: <MainHome /> },
    { path: '/goals', element: <GoalList /> },
    { path: '/bookmarks', element: <BookmarkList /> },
    { path: '/friends', element: <FriendList /> },
    { path: '/settings', element: <Settings /> },
  ];

  return (
    <BrowserRouter>
      <AuthLoader>
        <Routes>
          <Route
            path="/"
            element={
              accessToken ? (
                <Navigate to="/main" replace />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/terms" element={<Terms />} />
          
          {privateRoutes.map(({ path, element }) => (
            <Route key={path} path={path} element={<PrivateRoute>{element}</PrivateRoute>} />
          ))}
        </Routes>
      </AuthLoader>

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