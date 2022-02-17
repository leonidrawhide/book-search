import { Route, Routes } from 'react-router-dom';
import './App.css';
import BookList from './components/BookList/BookList';
import Header from './components/Header/Header';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path={'/'} element={<Header />}>
          <Route index element={<BookList />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
