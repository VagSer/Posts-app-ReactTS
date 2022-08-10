import './style/App.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PostsPage from './pages/PostsPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<PostsPage />}/>
        <Route path='/:number' element={<PostsPage />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
