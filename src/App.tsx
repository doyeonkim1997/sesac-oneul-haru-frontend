import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './pages/Signup';
// ... 다른 import

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        {/* 다른 라우트들 */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
