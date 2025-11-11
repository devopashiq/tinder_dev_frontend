import { Outlet } from "react-router-dom";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import { useEffect } from "react";

function AuthLayouts() {
  

  useEffect(()=>{

  },[])


  return (
    <>
     <Navbar></Navbar>
   
      <Outlet />
      <Footer></Footer>
    </>
   

  );
} 

export default AuthLayouts;
