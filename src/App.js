import logo from './logo.svg';
import './App.css';
import Login from './core/login/Login';
import ReactDOM from "react-dom";

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Layout from "./components/layout/layout"
import Privatelayout from './privatelayout';
import axios from 'axios';


// For GET requests
axios.interceptors.request.use(
  (req) => {
    let token = localStorage.getItem("access_token");
    if(token){
      req.headers['Authorization'] = 'Bearer ' + token;
    }
     return req;
  },
  (err) => {
     return Promise.reject(err);
  }
);

// For POST requests
axios.interceptors.response.use(
  (res) => {
    let token = localStorage.getItem("access_token");
    if(token){
      res.headers['Authorization'] = 'Bearer ' + token;
    }
     if (res.status === 201) {
        console.log('Posted Successfully');
     }
     return res;
  },
  (err) => {
     return Promise.reject(err);
  }
);

function App() {
  return (
    <div className="App">
          <Router>
            <Routes>
            <Route path="/login" element={<Login />} />
              <Route path="/" element={<Login />} />
              <Route path="home/*" element={<Privatelayout/>}>
              </Route>
            </Routes>
          </Router>
    </div>
  );
}

export default App;
