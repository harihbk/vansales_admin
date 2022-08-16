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
// import User from './components/pages/user/user';
import Subrole from './components/pages/subrole/subrole';
// import Truck from './components/pages/truck/truck';
import DeliveryPlanning from './components/pages/deliveryplanning/deliveryplanning';
import Deliveryorderlist from './components/pages/deliveryplanning/deliveryorderlist';
import Index from './components/pages/designation/Index';
import Users from './components/pages/users';
import Vehicletype from './components/pages/vehicle'
import Truck from './components/pages/trucks'

function Privatelayout() {
  return (
    <div >
       <Layouts >
                <Routes>
                    <Route exact path='/' element={<ProtectedRoute/>}>
                        <Route path="/" element={<Home />} />
                        <Route path="role" element={<Roles />} />
                        <Route path="user" element={<Users />} />
                        <Route path="subrole" element={<Subrole />} />
                        <Route path="truck" element={<Truck />} />
                        <Route path="delivery" element={<DeliveryPlanning />} />
                        <Route path="deliveryorderlist" element={<Deliveryorderlist />} />
                        <Route path="designation" element={<Index />} />
                        <Route path="vehicle" element={<Vehicletype />} />

                        
                        


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
