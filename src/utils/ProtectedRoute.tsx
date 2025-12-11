import axios from "axios";
import { useEffect, useState, type PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";
import { BASE_URL } from "./constans";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "./userSlice";
import type { RootState } from "./store";

export default function ProtectedRoute({ children }: PropsWithChildren) {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);

  const [isLoading, setIsLoading] = useState(true);

  async function fetchUserDetails() {
    try {
      const res = await axios.get(`${BASE_URL}/profile/view`, {
        withCredentials: true,
      });

      dispatch(addUser(res.data));
    } catch (err) {
      console.log(err);
      
     
    } finally {
      setIsLoading(false); 
    }
  }

  useEffect(() => {
    if (!user) {
      fetchUserDetails();
    } else {
      setIsLoading(false); 
    }
  }, []);

  if (isLoading) return <div>Loading...</div>;

  if (!user) {
    return <Navigate to="/home" replace state={{ openLogin: true }} />;
  }

  return <>{children}</>;
}
