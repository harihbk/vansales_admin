import logo from './logo.svg';
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Home from "./components/home/home";
import Layouts from "./components/layout/_layout";
import ProtectedRoute from "./components/Route/ProtectedRoute";
import { AuthProvider } from "./components/context/AuthProvider";
import Roles from './components/pages/role/role';
import User from './components/pages/user/user';
import Subrole from './components/pages/subrole/subrole';

function Privatelayout() {
  return (
    <div >
       <Layouts >
                <Routes>
                    <Route exact path='/' element={<ProtectedRoute/>}>
                        <Route path="/" element={<Home />} />
                        <Route path="role" element={<Roles />} />
                        <Route path="user" element={<User />} />
                        <Route path="subrole" element={<Subrole />} />


                    </Route>
                </Routes>
       </Layouts>
            {/* <Layouts>
                <Routes>
                    <Route exact path='/' element={<ProtectedRoute/>}>
                        <Route path="/" element={<Home />} />
                        <Route path="role" element={<Roles />} />
                    </Route>
                </Routes>
            </Layouts> */}
      
    </div>
  );
}

export default Privatelayout;
