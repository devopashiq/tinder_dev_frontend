import { Routes, Route, BrowserRouter } from "react-router-dom";

import "./App.css";


import Profile from "./pages/Profile";
import AuthLayouts from "./layouts/AuthLayouts";
import MainLayouts from "./layouts/MainLayouts";
import ProtectedRoute from "./utils/ProtectedRoute";


function App() {

  
  return (

    <BrowserRouter>
      <Routes >
        <Route  path='/home'  element={<AuthLayouts />}>
        </Route>

        <Route path='/'  element={< ProtectedRoute><MainLayouts /></ProtectedRoute> }>
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
