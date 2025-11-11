
import axios from "axios";
import { useEffect, useState, type PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";
import { BASE_URL } from "./constans";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "./userSlice";
import type { RootState } from "./store";


function ProtectedRoute({children}:PropsWithChildren){
     const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
       const dispatch = useDispatch();
       const  user = useSelector((state:RootState)=>state.user);
         const [isLoading, setIsLoading] = useState(true);


    
    // const isAuthenticated = localStorage.getItem('token');
    // console.log(children);

  async function fetchUserDetails(){
    if(user){
        setIsAuthenticated(true);
        setIsLoading(false);
        return;
    }

       
    try{
         const result = await axios.get(BASE_URL+'/profile/view',{withCredentials:true});
         console.log(result);
          if (result.status === 200 && result.data) {
        setIsAuthenticated(true);
        dispatch(addUser({...result.data,image:result.data?.image || 'https://lh3.googleusercontent.com/a/ACg8ocKuOHSha7tvxnAlvvFbzL-sjEkgN5CBkLLClTt9YW47buEmgA=s192-c-mo',}))
      } else {
        setIsAuthenticated(false);
      }


         

    }catch(err:unknown){
        
        if(axios.isAxiosError(err) && err.response?.status ===401){
            setIsAuthenticated(false)
        }else{
              console.error("Error fetching user:", err);
          setIsAuthenticated(false);
        }


    }finally{
        setIsLoading(false)
    }

    
    

    }





   useEffect(()=>{
  
      fetchUserDetails()
    

   



   },[])

    if (isLoading) return <div>Loading...</div>;

    
   

    if(!isAuthenticated){
        return <Navigate to='/home' replace state={{openLogin:true}}/>
    }else{
        return  <>{children}</>

    }

    
}


export default ProtectedRoute