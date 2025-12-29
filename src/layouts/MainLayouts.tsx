import { Outlet } from "react-router-dom";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import { useEffect } from "react";

function MainLayouts() {
  

  useEffect(()=>{

  },[])


  return (
  <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Main content grows and pushes footer down */}
      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
   

  );
} 

export default MainLayouts;
