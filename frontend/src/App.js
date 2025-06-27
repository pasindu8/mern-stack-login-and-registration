import './App.css';
import Homepage from "./homepages/Homepage";
import Login from "./Login/Login";
import Register from "./Register/Register";
import {
  BrowserRouter as Router,
  Routes, 
  Route
} from "react-router-dom";
import { useState } from 'react';

function App() {
  const [user, setLoginUser] = useState({});

  return (
    <div className="App">
      <Router>
        
        <Routes>
          <Route path="/" element={user && user._id ? <Homepage /> : <Login setLoginUser={setLoginUser} />} />
          <Route path="/Login" element={<Login setLoginUser={setLoginUser} />} />
          <Route path="/Register" element={<Register />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;