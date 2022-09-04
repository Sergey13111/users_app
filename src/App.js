import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Users from './pages/Users';
import Posts from './pages/Posts';
import NotFound from './pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={ <Users /> } />
        <Route path='/users/:id/posts' element={ <Posts /> } />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
