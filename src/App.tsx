import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import MainHome from './pages/Main/MainHome';
// ... 다른 import

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/main" element={<MainHome />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
