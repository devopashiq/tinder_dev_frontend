import { useEffect, useState } from "react";
import Login from "../pages/Login";
import { useLocation} from "react-router-dom";


function AuthLayouts() {
     




  const [showLogin, setShowLogin] = useState<boolean>(false);


  const location = useLocation();


  useEffect(()=>{

    if(location.state?.openLogin){
        setShowLogin(true)
    }


   

    
  },[location.state])

  return (
    <div className="relative min-h-screen bg-[url('/background.png')] bg-cover bg-center flex flex-col items-center justify-center">
      <h1 className="text-white text-6xl md:text-8xl font-bold text-center mb-8">
        Build Bonds That Scale.
      </h1>

      <button
        className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-lg font-semibold shadow-md"
        onClick={() => setShowLogin(true)}
      >
        Create Account
      </button>

      {showLogin && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/75">
          <Login  handleClose={() => setShowLogin(false)}/>
        </div>
      )}
    </div>
  );
}

export default AuthLayouts;
