import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

import Nav from './components/Nav';
import FileUpload from './components/Pages/FileUpload';
import Login from './components/Pages/Login'
import Register from "./components/Pages/Register"


function App() {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<FileUpload />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
