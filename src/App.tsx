import { Routes, Route, BrowserRouter } from "react-router-dom";
  import { ToastContainer} from 'react-toastify';
import "./App.css";

import Profile from "./pages/Profile";
import AuthLayouts from "./layouts/AuthLayouts";
import MainLayouts from "./layouts/MainLayouts";
import ProtectedRoute from "./utils/ProtectedRoute";
import Feed from "./pages/Feed";
import Connection from "./pages/Connection";
import Request from "./pages/Request";
import Chat from "./pages/Chat";
import Premium from "./pages/Premium";

function App() {
  return (

    <BrowserRouter>
        
      <Routes>
        <Route path="/home" element={<AuthLayouts />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <MainLayouts />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<Feed />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/connections" element={<Connection />} />
          <Route path="/requests" element={<Request />} />
          <Route path="/premium" element={<Premium />} />
          <Route path="/chat/:targetUserId" element={<Chat />} />
          <Route path="/chat/:targetUserId" element={<Chat />} />
        </Route>
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
