import './App.css'
import Login from './components/login/Login'
import { Routes, Route } from "react-router-dom";
import SignUp from './components/signup/Signup';
import Home from './components/home/Home';

function App() {

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </>
  )
}

export default App;
